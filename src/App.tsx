import { useEffect, useMemo, useRef, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { AccountModal } from './components/AccountModal';
import { ActiveOrderBar } from './components/ActiveOrderBar';
import { AdminSection } from './components/AdminSection';
import { BottomNav } from './components/BottomNav';
import { CartDrawer } from './components/CartDrawer';
import { CatalogSection } from './components/CatalogSection';
import { ChristmasPromoBanner } from './components/ChristmasPromoBanner';
import { CustomerOrdersDrawer } from './components/CustomerOrdersDrawer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductModal } from './components/ProductModal';
import { QuickViewDrawer } from './components/QuickViewDrawer';
import { Snowfall } from './components/Snowfall';
import { Toast } from './components/Toast';
import { TrustFooter } from './components/TrustFooter';
import { WelcomeModal } from './components/WelcomeModal';
import { DEFAULT_CURRENCY_CODE } from './data/currencies';
import { INITIAL_ORDERS, INITIAL_PRODUCTS } from './data/products';
import { OperationType, auth, db, googleProvider, handleFirestoreError } from './firebase';
import { getLanguageMeta, getTranslations } from './i18n/translations';
import {
  CartItem,
  LanguageCode,
  OrderRecord,
  OrderStatus,
  PaymentMethod,
  Product,
  ProductCategory,
  ProductReview,
  SortOption,
} from './types/shop';

const STORAGE_KEYS = {
  PRODUCTS: 'alians_shop_products_v2',
  CART: 'alians_shop_cart_v2',
  WISHLIST: 'alians_shop_wishlist_v2',
  ORDERS: 'alians_shop_orders_v2',
  CURRENCY: 'alians_shop_currency_v2',
  LANGUAGE: 'alians_shop_language_v2',
  REVIEWS: 'alians_shop_reviews_v2',
};

function readJsonStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const [products, setProducts] = useState<Product[]>(() =>
    readJsonStorage<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS)
  );
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(ProductCategory.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>(SortOption.BEST_SELLING);
  const [showSortControls, setShowSortControls] = useState(false);
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  const [city, setCity] = useState('بغداد، العراق');
  const [activeBottomTab, setActiveBottomTab] = useState<'home' | 'explore' | 'wishlist' | 'profile'>('home');
  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const [language, setLanguage] = useState<LanguageCode>(() =>
    readJsonStorage<LanguageCode>(STORAGE_KEYS.LANGUAGE, 'ar')
  );
  const [currency, setCurrency] = useState<string>(() =>
    readJsonStorage<string>(STORAGE_KEYS.CURRENCY, DEFAULT_CURRENCY_CODE)
  );
  const [cart, setCart] = useState<CartItem[]>(() =>
    readJsonStorage<CartItem[]>(STORAGE_KEYS.CART, [])
  );
  const [wishlistIds, setWishlistIds] = useState<string[]>(() =>
    readJsonStorage<string[]>(STORAGE_KEYS.WISHLIST, [])
  );
  const [orders, setOrders] = useState<OrderRecord[]>(() =>
    readJsonStorage<OrderRecord[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS)
  );
  const [firestoreOrders, setFirestoreOrders] = useState<OrderRecord[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [customReviews, setCustomReviews] = useState<Record<string, ProductReview[]>>(() =>
    readJsonStorage<Record<string, ProductReview[]>>(STORAGE_KEYS.REVIEWS, {})
  );

  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartInitialStep, setCartInitialStep] = useState<'cart' | 'checkout'>('cart');
  const [ordersDrawerOpen, setOrdersDrawerOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const t = useMemo(() => getTranslations(language), [language]);
  const langMeta = useMemo(() => getLanguageMeta(language), [language]);

  // Listen to Firebase Auth state & sync Google user profile in Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);

      if (currentUser && currentUser.emailVerified && currentUser.email) {
        const userPath = `users/${currentUser.uid}`;
        try {
          const userRef = doc(db, 'users', currentUser.uid);
          const snap = await getDoc(userRef);
          const safeDisplayName = (currentUser.displayName || 'مستخدم أليانز شوب').slice(0, 100);
          const safeEmail = currentUser.email.slice(0, 200);
          const safePhoto = (currentUser.photoURL || '').slice(0, 500);

          if (!snap.exists()) {
            await setDoc(userRef, {
              uid: currentUser.uid,
              displayName: safeDisplayName,
              email: safeEmail,
              photoURL: safePhoto,
              city: city.slice(0, 80),
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            });
          } else {
            await updateDoc(userRef, {
              displayName: safeDisplayName,
              photoURL: safePhoto,
              city: city.slice(0, 80),
              updatedAt: serverTimestamp(),
            });
          }
        } catch (err) {
          handleFirestoreError(err, OperationType.WRITE, userPath);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Subscribe to authenticated user's Firestore orders when signed in
  useEffect(() => {
    if (!user || !user.emailVerified) {
      setFirestoreOrders([]);
      setOrdersLoading(false);
      return;
    }

    setOrdersLoading(true);
    const ordersPath = `users/${user.uid}/orders`;
    const ordersQuery = query(
      collection(db, 'users', user.uid, 'orders'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(
      ordersQuery,
      (snapshot) => {
        const remoteOrders: OrderRecord[] = snapshot.docs
          .map((docSnap) => {
            const d = docSnap.data();
            return {
              id: String(d.id || docSnap.id),
              createdAt: d.createdAt?.toDate
                ? d.createdAt.toDate().toISOString()
                : new Date().toISOString(),
              status: (d.status as OrderStatus) || OrderStatus.PREPARING,
              paymentMethod: (d.paymentMethod as PaymentMethod) || PaymentMethod.COD,
              items: [],
              subtotalIqd: Number(d.subtotalIqd || 0),
              discountIqd: Number(d.discountIqd || 0),
              shippingIqd: Number(d.shippingIqd || 0),
              totalIqd: Number(d.totalIqd || 0),
              customer: {
                fullName: String(d.customerName || ''),
                phone: String(d.customerPhone || ''),
                city: String(d.customerCity || ''),
                address: String(d.customerAddress || ''),
                postalCode: '',
              },
              itemsSummary: d.itemsSummary ? String(d.itemsSummary) : undefined,
              ownerUid: String(d.userId || user.uid),
              estimatedDelivery: String(d.estimatedDelivery || ''),
            };
          })
          .sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

        setFirestoreOrders(remoteOrders);
        setOrdersLoading(false);
        if (remoteOrders.length > 0) {
          setOrders(remoteOrders);
        }
      },
      (error) => {
        setOrdersLoading(false);
        handleFirestoreError(error, OperationType.LIST, ordersPath);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // Subscribe to public Firestore product reviews
  useEffect(() => {
    const reviewsQuery = query(
      collection(db, 'reviews'),
      where('isPublic', '==', true)
    );

    const unsubscribe = onSnapshot(
      reviewsQuery,
      (snapshot) => {
        const grouped: Record<string, ProductReview[]> = {};
        snapshot.docs.forEach((docSnap) => {
          const d = docSnap.data();
          const pid = String(d.productId || '');
          if (!pid) return;
          const rev: ProductReview = {
            id: String(d.id || docSnap.id),
            author: String(d.author || 'مستخدم أليانز شوب'),
            rating: Number(d.rating || 5),
            date: d.createdAt?.toDate
              ? d.createdAt.toDate().toISOString().slice(0, 10)
              : new Date().toISOString().slice(0, 10),
            comment: String(d.comment || ''),
            verifiedSize: d.verifiedSize ? String(d.verifiedSize) : undefined,
          };
          if (!grouped[pid]) grouped[pid] = [];
          grouped[pid].push(rev);
        });

        Object.keys(grouped).forEach((pid) => {
          grouped[pid].sort((a, b) => b.date.localeCompare(a.date));
        });

        setCustomReviews(grouped);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'reviews');
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    document.documentElement.lang = langMeta.code;
    document.documentElement.dir = langMeta.dir;
  }, [langMeta]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch {
      // Ignore storage errors
    }
  }, [products]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch {
      // Ignore storage errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlistIds));
    } catch {
      // Ignore storage errors
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch {
      // Ignore storage errors
    }
  }, [orders]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.CURRENCY, JSON.stringify(currency));
    } catch {
      // Ignore storage errors
    }
  }, [currency]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.LANGUAGE, JSON.stringify(language));
    } catch {
      // Ignore storage errors
    }
  }, [language]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(customReviews));
    } catch {
      // Ignore storage errors
    }
  }, [customReviews]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleGoogleSignIn = async () => {
    setAuthError(null);
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      if (cred.user) {
        showToast(`أهلاً بكِ، ${cred.user.displayName || 'تم تسجيل الدخول'}`);
      }
    } catch (error) {
      console.error('Google Sign-In failed:', error);
      setAuthError('تعذر إتمام تسجيل الدخول بحساب Google. يرجى السماح بالنوافذ المنبثقة والمحاولة مجدداً.');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      showToast('تم تسجيل الخروج بنجاح');
    } catch (error) {
      console.error('Sign-out failed:', error);
    }
  };

  const enrichedProducts = useMemo(() => {
    return products.map((product) => {
      const extra = customReviews[product.id] || [];
      const merged = [...extra, ...product.reviews];
      const count = merged.length;
      const avg =
        count > 0
          ? merged.reduce((sum, item) => sum + item.rating, 0) / count
          : 0;
      return {
        ...product,
        rating: avg,
        reviewCount: count,
      };
    });
  }, [products, customReviews]);

  const filteredProducts = useMemo(() => {
    const queryText = searchQuery.trim().toLowerCase();
    const list = enrichedProducts.filter((product) => {
      if (showWishlistOnly && !wishlistIds.includes(product.id)) {
        return false;
      }
      if (
        !showWishlistOnly &&
        selectedCategory !== ProductCategory.ALL &&
        product.category !== selectedCategory
      ) {
        return false;
      }
      if (!queryText) return true;
      return (
        product.name.toLowerCase().includes(queryText) ||
        product.subtitle.toLowerCase().includes(queryText) ||
        (t.categories[product.category] || '').toLowerCase().includes(queryText) ||
        product.material.toLowerCase().includes(queryText)
      );
    });

    return [...list].sort((a, b) => {
      switch (sortBy) {
        case SortOption.PRICE_LOW:
          return a.priceIqd - b.priceIqd;
        case SortOption.PRICE_HIGH:
          return b.priceIqd - a.priceIqd;
        case SortOption.TOP_RATED:
          return b.rating - a.rating || b.reviewCount - a.reviewCount;
        case SortOption.BEST_SELLING:
        default:
          return b.soldCount - a.soldCount;
      }
    });
  }, [enrichedProducts, selectedCategory, searchQuery, sortBy, showWishlistOnly, wishlistIds, t]);

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('تمت الإزالة من المفضلة');
        return prev.filter((id) => id !== productId);
      }
      showToast('تمت الإضافة إلى المفضلة');
      return [...prev, productId];
    });
  };

  const handleAddToCart = (
    product: Product,
    colorName: string,
    colorHex: string,
    size: string,
    quantity: number,
    openCheckoutDirectly = false
  ) => {
    const key = `${product.id}__${colorName}__${size}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key
            ? { ...item, quantity: Math.min(10, item.quantity + quantity) }
            : item
        );
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          name: product.name,
          image: product.image,
          priceIqd: product.priceIqd,
          color: colorName,
          colorHex,
          size,
          quantity,
        },
      ];
    });

    setActiveProduct(null);
    if (openCheckoutDirectly) {
      setCartInitialStep('checkout');
      setCartOpen(true);
    } else {
      showToast(`"${product.name}" +`);
    }
  };

  const handleQuickAdd = (product: Product) => {
    const defaultColor = product.colors[0];
    const defaultSize = product.sizes[0] || 'مقاس موحد';
    handleAddToCart(product, defaultColor.name, defaultColor.hex, defaultSize, 1, false);
  };

  const handleUpdateQty = (key: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (key: string) => {
    setCart((prev) => prev.filter((item) => item.key !== key));
  };

  const handlePlaceOrder = async (order: OrderRecord) => {
    if (!user || !user.emailVerified) {
      showToast('يجب تسجيل الدخول بحساب Google أولاً لإتمام الطلب');
      setCartOpen(false);
      setAccountOpen(true);
      return;
    }

    setOrders((prev) => [order, ...prev]);
    setCart([]);
    showToast(`تم قبول الطلب #${order.id} وإرساله إلى @elianah_shop2026`);

    const addressWithInsta = order.customer.instagramUsername
      ? `${order.customer.address} (إنستغرام: ${order.customer.instagramUsername})`
      : order.customer.address;

    const userPath = `users/${user.uid}`;
    const orderPath = `users/${user.uid}/orders/${order.id}`;
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists() && user.email) {
        await setDoc(userRef, {
          uid: user.uid,
          displayName: (user.displayName || 'مستخدم أليانز شوب').slice(0, 100),
          email: user.email.slice(0, 200),
          photoURL: (user.photoURL || '').slice(0, 500),
          city: city.slice(0, 80),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }

      const itemsSummary = order.items
        .map((it) => `${it.name} (${it.size}) × ${it.quantity}`)
        .join(' ، ')
        .slice(0, 500);

      await setDoc(doc(db, 'users', user.uid, 'orders', order.id), {
        id: order.id.slice(0, 64),
        userId: user.uid,
        status: order.status,
        paymentMethod: order.paymentMethod,
        subtotalIqd: order.subtotalIqd,
        discountIqd: order.discountIqd,
        shippingIqd: order.shippingIqd,
        totalIqd: order.totalIqd,
        customerName: order.customer.fullName.slice(0, 100),
        customerPhone: order.customer.phone.slice(0, 30),
        customerCity: order.customer.city.slice(0, 80),
        customerAddress: addressWithInsta.slice(0, 240),
        estimatedDelivery: order.estimatedDelivery.slice(0, 120),
        ...(itemsSummary ? { itemsSummary } : {}),
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, user ? orderPath : userPath);
    }
  };

  const handleAddReview = async (productId: string, review: ProductReview) => {
    if (!user || !user.emailVerified) {
      showToast('يجب تسجيل الدخول بحساب Google لإضافة تقييم');
      setAccountOpen(true);
      return;
    }

    const cleanId = review.id.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 64);
    const reviewPath = `reviews/${cleanId}`;
    try {
      await setDoc(doc(db, 'reviews', cleanId), {
        id: cleanId,
        productId: productId.slice(0, 64),
        userId: user.uid,
        author: (user.displayName || review.author || 'مستخدم أليانز شوب').slice(0, 100),
        rating: Math.min(5, Math.max(1, Math.round(review.rating))),
        comment: review.comment.trim().slice(0, 500),
        ...(review.verifiedSize ? { verifiedSize: review.verifiedSize.slice(0, 40) } : {}),
        isPublic: true,
        createdAt: serverTimestamp(),
      });
      showToast('تم نشر التقييم بنجاح');
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, reviewPath);
    }
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`تم نشر "${newProduct.name}" في المتجر`);
  };

  const handleUpdateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`تم تحديث "${updated.name}"`);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setCart((prev) => prev.filter((item) => item.productId !== productId));
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
    showToast('تم حذف المنتج');
  };

  const handleUpdateOrderStatus = async (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showToast('تم تحديث حالة الطلب');

    if (user && user.emailVerified) {
      const targetOrder = firestoreOrders.find((o) => o.id === orderId);
      if (targetOrder) {
        const orderPath = `users/${user.uid}/orders/${orderId}`;
        try {
          await updateDoc(doc(db, 'users', user.uid, 'orders', orderId), { status });
        } catch (err) {
          handleFirestoreError(err, OperationType.UPDATE, orderPath);
        }
      }
    }
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const activeOrderCount = firestoreOrders.filter(
    (o) => o.status !== OrderStatus.DELIVERED
  ).length;

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#18181B] relative">
      <Snowfall />

      <Header
        t={t}
        city={city}
        onChangeCity={setCity}
        user={user}
        cartCount={cartCount}
        activeOrderCount={activeOrderCount}
        onOpenCart={() => {
          setCartInitialStep('cart');
          setCartOpen(true);
        }}
        onOpenOrders={() => setOrdersDrawerOpen(true)}
        onOpenWelcome={() => setWelcomeOpen(true)}
        onOpenAccount={() => setAccountOpen(true)}
      />

      <ChristmasPromoBanner
        t={t}
        onCopyPromoCode={() => showToast(t.promoCopiedToast)}
        onExploreCatalog={scrollToCatalog}
      />

      <main className="flex-1 relative z-10">
        <HeroSection
          t={t}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setShowWishlistOnly(false);
            setSelectedCategory(cat);
          }}
          onExploreCatalog={scrollToCatalog}
          onToggleFilterSort={() => {
            setShowSortControls((prev) => !prev);
            scrollToCatalog();
          }}
        />

        <ActiveOrderBar
          t={t}
          orders={firestoreOrders}
          currency={currency}
          onOpenMyOrders={() => setOrdersDrawerOpen(true)}
        />

        <CatalogSection
          t={t}
          totalCatalogCount={products.length}
          products={filteredProducts}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          showSortControls={showSortControls}
          showWishlistOnly={showWishlistOnly}
          onToggleWishlistOnly={() => setShowWishlistOnly((prev) => !prev)}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={setQuickViewProduct}
          onOpenProduct={setActiveProduct}
          onQuickAdd={handleQuickAdd}
          currency={currency}
        />
      </main>

      <TrustFooter
        t={t}
        language={language}
        onChangeLanguage={setLanguage}
        currency={currency}
        onChangeCurrency={setCurrency}
        onOpenWelcome={() => setWelcomeOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* PIN-locked Admin Panel Modal (code: 304922) opened from the Lock icon beside Language & Currency */}
      <AdminSection
        t={t}
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        products={products}
        orders={orders}
        currency={currency}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onUpdateOrderStatus={handleUpdateOrderStatus}
      />

      <BottomNav
        t={t}
        activeTab={activeBottomTab}
        cartCount={cartCount}
        onSelectHome={() => {
          setActiveBottomTab('home');
          setShowWishlistOnly(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectExplore={() => {
          setActiveBottomTab('explore');
          setShowWishlistOnly(false);
          scrollToCatalog();
        }}
        onOpenCart={() => {
          setCartInitialStep('cart');
          setCartOpen(true);
        }}
        onSelectWishlist={() => {
          setActiveBottomTab('wishlist');
          setShowWishlistOnly(true);
          scrollToCatalog();
        }}
        onSelectProfile={() => {
          setActiveBottomTab('profile');
          setAccountOpen(true);
        }}
      />

      <AccountModal
        t={t}
        isOpen={accountOpen}
        user={user}
        authLoading={authLoading}
        authError={authError}
        wishlistCount={wishlistIds.length}
        city={city}
        currency={currency}
        orders={firestoreOrders}
        ordersLoading={ordersLoading}
        onClose={() => setAccountOpen(false)}
        onGoogleSignIn={handleGoogleSignIn}
        onSignOut={handleSignOut}
        onOpenWelcome={() => setWelcomeOpen(true)}
      />

      <WelcomeModal
        t={t}
        isOpen={welcomeOpen}
        onClose={() => setWelcomeOpen(false)}
      />

      <QuickViewDrawer
        t={t}
        product={quickViewProduct}
        currency={currency}
        user={user}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        extraReviews={quickViewProduct ? customReviews[quickViewProduct.id] || [] : []}
        onClose={() => setQuickViewProduct(null)}
        onOpenFullProduct={(prod) => setActiveProduct(prod)}
        onGoogleSignIn={handleGoogleSignIn}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onAddReview={handleAddReview}
      />

      <ProductModal
        t={t}
        product={activeProduct}
        currency={currency}
        user={user}
        isWishlisted={activeProduct ? wishlistIds.includes(activeProduct.id) : false}
        extraReviews={activeProduct ? customReviews[activeProduct.id] || [] : []}
        onClose={() => setActiveProduct(null)}
        onGoogleSignIn={handleGoogleSignIn}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onAddReview={handleAddReview}
      />

      <CartDrawer
        t={t}
        isOpen={cartOpen}
        initialStep={cartInitialStep}
        items={cart}
        currency={currency}
        user={user}
        authLoading={authLoading}
        authError={authError}
        onGoogleSignIn={handleGoogleSignIn}
        onClose={() => setCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onPlaceOrder={handlePlaceOrder}
      />

      <CustomerOrdersDrawer
        t={t}
        isOpen={ordersDrawerOpen}
        user={user}
        authLoading={authLoading}
        orders={firestoreOrders}
        ordersLoading={ordersLoading}
        currency={currency}
        onClose={() => setOrdersDrawerOpen(false)}
        onGoogleSignIn={handleGoogleSignIn}
      />

      <Toast message={toastMessage} />
    </div>
  );
}
