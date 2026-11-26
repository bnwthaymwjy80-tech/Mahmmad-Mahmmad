export interface WorldCurrency {
  code: string;
  symbol: string;
  nameAr: string;
  nameEn: string;
  countryAr: string;
  /** Value of 1 USD in this currency (IQD base = 1310 IQD per 1 USD) */
  perUsd: number;
  decimals: number;
}

export const IQD_PER_USD = 1310;
export const DEFAULT_CURRENCY_CODE = 'IQD';

export const WORLD_CURRENCIES: WorldCurrency[] = [
  { code: 'IQD', symbol: 'د.ع', nameAr: 'الدينار العراقي', nameEn: 'Iraqi Dinar', countryAr: 'العراق', perUsd: 1310, decimals: 0 },
  { code: 'USD', symbol: '$', nameAr: 'الدولار الأمريكي', nameEn: 'US Dollar', countryAr: 'الولايات المتحدة', perUsd: 1, decimals: 2 },
  { code: 'EUR', symbol: '€', nameAr: 'اليورو', nameEn: 'Euro', countryAr: 'الاتحاد الأوروبي', perUsd: 0.92, decimals: 2 },
  { code: 'GBP', symbol: '£', nameAr: 'الجنيه الإسترليني', nameEn: 'British Pound', countryAr: 'المملكة المتحدة', perUsd: 0.79, decimals: 2 },
  { code: 'SAR', symbol: 'ر.س', nameAr: 'الريال السعودي', nameEn: 'Saudi Riyal', countryAr: 'السعودية', perUsd: 3.75, decimals: 2 },
  { code: 'AED', symbol: 'د.إ', nameAr: 'الدرهم الإماراتي', nameEn: 'UAE Dirham', countryAr: 'الإمارات', perUsd: 3.67, decimals: 2 },
  { code: 'KWD', symbol: 'د.ك', nameAr: 'الدينار الكويتي', nameEn: 'Kuwaiti Dinar', countryAr: 'الكويت', perUsd: 0.31, decimals: 2 },
  { code: 'QAR', symbol: 'ر.ق', nameAr: 'الريال القطري', nameEn: 'Qatari Riyal', countryAr: 'قطر', perUsd: 3.64, decimals: 2 },
  { code: 'BHD', symbol: 'د.ب', nameAr: 'الدينار البحريني', nameEn: 'Bahraini Dinar', countryAr: 'البحرين', perUsd: 0.38, decimals: 2 },
  { code: 'OMR', symbol: 'ر.ع', nameAr: 'الريال العماني', nameEn: 'Omani Rial', countryAr: 'عمان', perUsd: 0.38, decimals: 2 },
  { code: 'JOD', symbol: 'د.أ', nameAr: 'الدينار الأردني', nameEn: 'Jordanian Dinar', countryAr: 'الأردن', perUsd: 0.71, decimals: 2 },
  { code: 'EGP', symbol: 'ج.م', nameAr: 'الجنيه المصري', nameEn: 'Egyptian Pound', countryAr: 'مصر', perUsd: 49.5, decimals: 2 },
  { code: 'LBP', symbol: 'ل.ل', nameAr: 'الليرة اللبنانية', nameEn: 'Lebanese Pound', countryAr: 'لبنان', perUsd: 89500, decimals: 0 },
  { code: 'SYP', symbol: 'ل.س', nameAr: 'الليرة السورية', nameEn: 'Syrian Pound', countryAr: 'سوريا', perUsd: 13000, decimals: 0 },
  { code: 'YER', symbol: 'ر.ي', nameAr: 'الريال اليمني', nameEn: 'Yemeni Rial', countryAr: 'اليمن', perUsd: 250, decimals: 0 },
  { code: 'TRY', symbol: '₺', nameAr: 'الليرة التركية', nameEn: 'Turkish Lira', countryAr: 'تركيا', perUsd: 34.5, decimals: 2 },
  { code: 'IRR', symbol: '﷼', nameAr: 'الريال الإيراني', nameEn: 'Iranian Rial', countryAr: 'إيران', perUsd: 42000, decimals: 0 },
  { code: 'MAD', symbol: 'د.م', nameAr: 'الدرهم المغربي', nameEn: 'Moroccan Dirham', countryAr: 'المغرب', perUsd: 9.9, decimals: 2 },
  { code: 'DZD', symbol: 'د.ج', nameAr: 'الدينار الجزائري', nameEn: 'Algerian Dinar', countryAr: 'الجزائر', perUsd: 134, decimals: 0 },
  { code: 'TND', symbol: 'د.ت', nameAr: 'الدينار التونسي', nameEn: 'Tunisian Dinar', countryAr: 'تونس', perUsd: 3.1, decimals: 2 },
  { code: 'LYD', symbol: 'د.ل', nameAr: 'الدينار الليبي', nameEn: 'Libyan Dinar', countryAr: 'ليبيا', perUsd: 4.85, decimals: 2 },
  { code: 'SDG', symbol: 'ج.س', nameAr: 'الجنيه السوداني', nameEn: 'Sudanese Pound', countryAr: 'السودان', perUsd: 601, decimals: 0 },
  { code: 'MRU', symbol: 'أ.م', nameAr: 'الأوقية الموريتانية', nameEn: 'Mauritanian Ouguiya', countryAr: 'موريتانيا', perUsd: 39.7, decimals: 2 },
  { code: 'SOS', symbol: 'Sh', nameAr: 'الشلن الصومالي', nameEn: 'Somali Shilling', countryAr: 'الصومال', perUsd: 571, decimals: 0 },
  { code: 'DJF', symbol: 'Fdj', nameAr: 'الفرنك الجيبوتي', nameEn: 'Djiboutian Franc', countryAr: 'جيبوتي', perUsd: 177.7, decimals: 0 },
  { code: 'KMF', symbol: 'CF', nameAr: 'الفرنك القمري', nameEn: 'Comorian Franc', countryAr: 'جزر القمر', perUsd: 454, decimals: 0 },
  { code: 'CAD', symbol: 'C$', nameAr: 'الدولار الكندي', nameEn: 'Canadian Dollar', countryAr: 'كندا', perUsd: 1.4, decimals: 2 },
  { code: 'AUD', symbol: 'A$', nameAr: 'الدولار الأسترالي', nameEn: 'Australian Dollar', countryAr: 'أستراليا', perUsd: 1.54, decimals: 2 },
  { code: 'NZD', symbol: 'NZ$', nameAr: 'الدولار النيوزيلندي', nameEn: 'New Zealand Dollar', countryAr: 'نيوزيلندا', perUsd: 1.69, decimals: 2 },
  { code: 'CHF', symbol: 'CHF', nameAr: 'الفرنك السويسري', nameEn: 'Swiss Franc', countryAr: 'سويسرا', perUsd: 0.88, decimals: 2 },
  { code: 'SEK', symbol: 'kr', nameAr: 'الكرونا السويدية', nameEn: 'Swedish Krona', countryAr: 'السويد', perUsd: 10.9, decimals: 2 },
  { code: 'NOK', symbol: 'kr', nameAr: 'الكرونة النرويجية', nameEn: 'Norwegian Krone', countryAr: 'النرويج', perUsd: 11.0, decimals: 2 },
  { code: 'DKK', symbol: 'kr', nameAr: 'الكرونة الدنماركية', nameEn: 'Danish Krone', countryAr: 'الدنمارك', perUsd: 6.9, decimals: 2 },
  { code: 'ISK', symbol: 'kr', nameAr: 'الكرونة الآيسلندية', nameEn: 'Icelandic Króna', countryAr: 'آيسلندا', perUsd: 138, decimals: 0 },
  { code: 'PLN', symbol: 'zł', nameAr: 'الزلوتي البولندي', nameEn: 'Polish Zloty', countryAr: 'بولندا', perUsd: 4.05, decimals: 2 },
  { code: 'CZK', symbol: 'Kč', nameAr: 'الكرونة التشيكية', nameEn: 'Czech Koruna', countryAr: 'التشيك', perUsd: 23.8, decimals: 2 },
  { code: 'HUF', symbol: 'Ft', nameAr: 'الفورنت المجري', nameEn: 'Hungarian Forint', countryAr: 'المجر', perUsd: 385, decimals: 0 },
  { code: 'RON', symbol: 'lei', nameAr: 'الليو الروماني', nameEn: 'Romanian Leu', countryAr: 'رومانيا', perUsd: 4.6, decimals: 2 },
  { code: 'BGN', symbol: 'лв', nameAr: 'الليف البلغاري', nameEn: 'Bulgarian Lev', countryAr: 'بلغاريا', perUsd: 1.8, decimals: 2 },
  { code: 'RSD', symbol: 'дин', nameAr: 'الدينار الصربي', nameEn: 'Serbian Dinar', countryAr: 'صربيا', perUsd: 108, decimals: 0 },
  { code: 'UAH', symbol: '₴', nameAr: 'الهريفنيا الأوكرانية', nameEn: 'Ukrainian Hryvnia', countryAr: 'أوكرانيا', perUsd: 41.3, decimals: 2 },
  { code: 'RUB', symbol: '₽', nameAr: 'الروبل الروسي', nameEn: 'Russian Ruble', countryAr: 'روسيا', perUsd: 98, decimals: 2 },
  { code: 'BYN', symbol: 'Br', nameAr: 'الروبل البيلاروسي', nameEn: 'Belarusian Ruble', countryAr: 'بيلاروسيا', perUsd: 3.28, decimals: 2 },
  { code: 'GEL', symbol: '₾', nameAr: 'اللاري الجورجي', nameEn: 'Georgian Lari', countryAr: 'جورجيا', perUsd: 2.72, decimals: 2 },
  { code: 'AZN', symbol: '₼', nameAr: 'المانات الأذربيجاني', nameEn: 'Azerbaijani Manat', countryAr: 'أذربيجان', perUsd: 1.7, decimals: 2 },
  { code: 'AMD', symbol: '֏', nameAr: 'الدرام الأرميني', nameEn: 'Armenian Dram', countryAr: 'أرمينيا', perUsd: 388, decimals: 0 },
  { code: 'KZT', symbol: '₸', nameAr: 'التينغ الكازاخستاني', nameEn: 'Kazakhstani Tenge', countryAr: 'كازاخستان', perUsd: 495, decimals: 0 },
  { code: 'UZS', symbol: 'soʻm', nameAr: 'السوم الأوزبكي', nameEn: 'Uzbekistani Som', countryAr: 'أوزبكستان', perUsd: 12800, decimals: 0 },
  { code: 'JPY', symbol: '¥', nameAr: 'الين الياباني', nameEn: 'Japanese Yen', countryAr: 'اليابان', perUsd: 154, decimals: 0 },
  { code: 'CNY', symbol: '¥', nameAr: 'اليوان الصيني', nameEn: 'Chinese Yuan', countryAr: 'الصين', perUsd: 7.24, decimals: 2 },
  { code: 'HKD', symbol: 'HK$', nameAr: 'دولار هونغ كونغ', nameEn: 'Hong Kong Dollar', countryAr: 'هونغ كونغ', perUsd: 7.78, decimals: 2 },
  { code: 'TWD', symbol: 'NT$', nameAr: 'الدولار التايواني', nameEn: 'Taiwan Dollar', countryAr: 'تايوان', perUsd: 32.4, decimals: 0 },
  { code: 'KRW', symbol: '₩', nameAr: 'الوون الكوري', nameEn: 'South Korean Won', countryAr: 'كوريا الجنوبية', perUsd: 1395, decimals: 0 },
  { code: 'INR', symbol: '₹', nameAr: 'الروبية الهندية', nameEn: 'Indian Rupee', countryAr: 'الهند', perUsd: 84.4, decimals: 2 },
  { code: 'PKR', symbol: '₨', nameAr: 'الروبية الباكستانية', nameEn: 'Pakistani Rupee', countryAr: 'باكستان', perUsd: 278, decimals: 0 },
  { code: 'BDT', symbol: '৳', nameAr: 'التاكا البنغلاديشية', nameEn: 'Bangladeshi Taka', countryAr: 'بنغلاديش', perUsd: 119.5, decimals: 0 },
  { code: 'LKR', symbol: 'Rs', nameAr: 'الروبية السريلانكية', nameEn: 'Sri Lankan Rupee', countryAr: 'سريلانكا', perUsd: 292, decimals: 0 },
  { code: 'NPR', symbol: '₨', nameAr: 'الروبية النيبالية', nameEn: 'Nepalese Rupee', countryAr: 'نيبال', perUsd: 135, decimals: 0 },
  { code: 'AFN', symbol: '؋', nameAr: 'الأفغاني', nameEn: 'Afghan Afghani', countryAr: 'أفغانستان', perUsd: 68, decimals: 0 },
  { code: 'SGD', symbol: 'S$', nameAr: 'الدولار السنغافوري', nameEn: 'Singapore Dollar', countryAr: 'سنغافورة', perUsd: 1.34, decimals: 2 },
  { code: 'MYR', symbol: 'RM', nameAr: 'الرينغيت الماليزي', nameEn: 'Malaysian Ringgit', countryAr: 'ماليزيا', perUsd: 4.46, decimals: 2 },
  { code: 'IDR', symbol: 'Rp', nameAr: 'الروبية الإندونيسية', nameEn: 'Indonesian Rupiah', countryAr: 'إندونيسيا', perUsd: 15850, decimals: 0 },
  { code: 'THB', symbol: '฿', nameAr: 'البات التايلاندي', nameEn: 'Thai Baht', countryAr: 'تايلاند', perUsd: 34.6, decimals: 2 },
  { code: 'VND', symbol: '₫', nameAr: 'الدونغ الفيتنامي', nameEn: 'Vietnamese Dong', countryAr: 'فيتنام', perUsd: 25400, decimals: 0 },
  { code: 'PHP', symbol: '₱', nameAr: 'البيزو الفلبيني', nameEn: 'Philippine Peso', countryAr: 'الفلبين', perUsd: 58.7, decimals: 2 },
  { code: 'MMK', symbol: 'K', nameAr: 'الكيات الميانماري', nameEn: 'Myanmar Kyat', countryAr: 'ميانمار', perUsd: 2100, decimals: 0 },
  { code: 'KHR', symbol: '៛', nameAr: 'الرييل الكمبودي', nameEn: 'Cambodian Riel', countryAr: 'كمبوديا', perUsd: 4060, decimals: 0 },
  { code: 'BND', symbol: 'B$', nameAr: 'دولار بروناي', nameEn: 'Brunei Dollar', countryAr: 'بروناي', perUsd: 1.34, decimals: 2 },
  { code: 'MNT', symbol: '₮', nameAr: 'التوغروغ المنغولي', nameEn: 'Mongolian Tugrik', countryAr: 'منغوليا', perUsd: 3410, decimals: 0 },
  { code: 'BRL', symbol: 'R$', nameAr: 'الريال البرازيلي', nameEn: 'Brazilian Real', countryAr: 'البرازيل', perUsd: 5.8, decimals: 2 },
  { code: 'MXN', symbol: 'Mex$', nameAr: 'البيزو المكسيكي', nameEn: 'Mexican Peso', countryAr: 'المكسيك', perUsd: 20.3, decimals: 2 },
  { code: 'ARS', symbol: 'AR$', nameAr: 'البيزو الأرجنتيني', nameEn: 'Argentine Peso', countryAr: 'الأرجنتين', perUsd: 1005, decimals: 0 },
  { code: 'CLP', symbol: 'CL$', nameAr: 'البيزو التشيلي', nameEn: 'Chilean Peso', countryAr: 'تشيلي', perUsd: 975, decimals: 0 },
  { code: 'COP', symbol: 'COL$', nameAr: 'البيزو الكولومبي', nameEn: 'Colombian Peso', countryAr: 'كولومبيا', perUsd: 4400, decimals: 0 },
  { code: 'PEN', symbol: 'S/', nameAr: 'السول البيروفي', nameEn: 'Peruvian Sol', countryAr: 'بيرو', perUsd: 3.78, decimals: 2 },
  { code: 'UYU', symbol: '$U', nameAr: 'البيزو الأوروغواياني', nameEn: 'Uruguayan Peso', countryAr: 'أوروغواي', perUsd: 42.5, decimals: 2 },
  { code: 'BOB', symbol: 'Bs', nameAr: 'البوليفيانو', nameEn: 'Bolivian Boliviano', countryAr: 'بوليفيا', perUsd: 6.91, decimals: 2 },
  { code: 'PYG', symbol: '₲', nameAr: 'الغواراني الباراغواياني', nameEn: 'Paraguayan Guarani', countryAr: 'باراغواي', perUsd: 7800, decimals: 0 },
  { code: 'VES', symbol: 'Bs.S', nameAr: 'البوليفار الفنزويلي', nameEn: 'Venezuelan Bolívar', countryAr: 'فنزويلا', perUsd: 46, decimals: 2 },
  { code: 'DOP', symbol: 'RD$', nameAr: 'البيزو الدومينيكاني', nameEn: 'Dominican Peso', countryAr: 'جمهورية الدومينيكان', perUsd: 60.2, decimals: 2 },
  { code: 'CRC', symbol: '₡', nameAr: 'الكولون الكوستاريكي', nameEn: 'Costa Rican Colón', countryAr: 'كوستاريكا', perUsd: 512, decimals: 0 },
  { code: 'GTQ', symbol: 'Q', nameAr: 'الكيتزال الغواتيمالي', nameEn: 'Guatemalan Quetzal', countryAr: 'غواتيمالا', perUsd: 7.72, decimals: 2 },
  { code: 'PAB', symbol: 'B/.', nameAr: 'البالبوا البنمي', nameEn: 'Panamanian Balboa', countryAr: 'بنما', perUsd: 1, decimals: 2 },
  { code: 'JMD', symbol: 'J$', nameAr: 'الدولار الجامايكي', nameEn: 'Jamaican Dollar', countryAr: 'جامايكا', perUsd: 158, decimals: 0 },
  { code: 'ZAR', symbol: 'R', nameAr: 'الراند الجنوب أفريقي', nameEn: 'South African Rand', countryAr: 'جنوب أفريقيا', perUsd: 18.1, decimals: 2 },
  { code: 'NGN', symbol: '₦', nameAr: 'النيرة النيجيرية', nameEn: 'Nigerian Naira', countryAr: 'نيجيريا', perUsd: 1650, decimals: 0 },
  { code: 'KES', symbol: 'KSh', nameAr: 'الشلن الكيني', nameEn: 'Kenyan Shilling', countryAr: 'كينيا', perUsd: 129, decimals: 0 },
  { code: 'GHS', symbol: '₵', nameAr: 'السيدي الغاني', nameEn: 'Ghanaian Cedi', countryAr: 'غانا', perUsd: 15.9, decimals: 2 },
  { code: 'ETB', symbol: 'Br', nameAr: 'البير الإثيوبي', nameEn: 'Ethiopian Birr', countryAr: 'إثيوبيا', perUsd: 123, decimals: 0 },
  { code: 'TZS', symbol: 'TSh', nameAr: 'الشلن التنزاني', nameEn: 'Tanzanian Shilling', countryAr: 'تنزانيا', perUsd: 2660, decimals: 0 },
  { code: 'UGX', symbol: 'USh', nameAr: 'الشلن الأوغندي', nameEn: 'Ugandan Shilling', countryAr: 'أوغندا', perUsd: 3680, decimals: 0 },
  { code: 'RWF', symbol: 'FRw', nameAr: 'الفرنك الرواندي', nameEn: 'Rwandan Franc', countryAr: 'رواندا', perUsd: 1370, decimals: 0 },
  { code: 'XOF', symbol: 'CFA', nameAr: 'فرنك غرب أفريقيا', nameEn: 'West African CFA', countryAr: 'السنغال وساحل العاج', perUsd: 605, decimals: 0 },
  { code: 'XAF', symbol: 'FCFA', nameAr: 'فرنك وسط أفريقيا', nameEn: 'Central African CFA', countryAr: 'الكاميرون والغابون', perUsd: 605, decimals: 0 },
  { code: 'MUR', symbol: '₨', nameAr: 'روبية موريشيوس', nameEn: 'Mauritian Rupee', countryAr: 'موريشيوس', perUsd: 46.5, decimals: 2 },
  { code: 'ZMW', symbol: 'ZK', nameAr: 'الكواشا الزامبية', nameEn: 'Zambian Kwacha', countryAr: 'زامبيا', perUsd: 27.3, decimals: 2 },
  { code: 'BWP', symbol: 'P', nameAr: 'البولا البوتسوانية', nameEn: 'Botswana Pula', countryAr: 'بتسوانا', perUsd: 13.6, decimals: 2 },
  { code: 'AOA', symbol: 'Kz', nameAr: 'الكوانزا الأنغولية', nameEn: 'Angolan Kwanza', countryAr: 'أنغولا', perUsd: 912, decimals: 0 },
  { code: 'MZN', symbol: 'MT', nameAr: 'المتيكال الموزمبيقي', nameEn: 'Mozambican Metical', countryAr: 'موزمبيق', perUsd: 63.9, decimals: 2 },
  { code: 'MGA', symbol: 'Ar', nameAr: 'الأرياري المدغشقري', nameEn: 'Malagasy Ariary', countryAr: 'مدغشقر', perUsd: 4650, decimals: 0 },
  { code: 'ILS', symbol: '₪', nameAr: 'الشيكل', nameEn: 'New Shekel', countryAr: 'فلسطين', perUsd: 3.72, decimals: 2 },
  { code: 'ALL', symbol: 'L', nameAr: 'الليك الألباني', nameEn: 'Albanian Lek', countryAr: 'ألبانيا', perUsd: 91, decimals: 0 },
  { code: 'BAM', symbol: 'KM', nameAr: 'المارك البوسني', nameEn: 'Bosnia Convertible Mark', countryAr: 'البوسنة والهرسك', perUsd: 1.8, decimals: 2 },
  { code: 'MKD', symbol: 'ден', nameAr: 'الدينار المقدوني', nameEn: 'Macedonian Denar', countryAr: 'مقدونيا الشمالية', perUsd: 56.8, decimals: 0 },
  { code: 'MDL', symbol: 'L', nameAr: 'الليو المولدوفي', nameEn: 'Moldovan Leu', countryAr: 'مولدوفا', perUsd: 18.1, decimals: 2 },
  { code: 'KGS', symbol: 'с', nameAr: 'السوم القيرغيزي', nameEn: 'Kyrgystani Som', countryAr: 'قيرغيزستان', perUsd: 86.5, decimals: 0 },
  { code: 'TJS', symbol: 'SM', nameAr: 'السوموني الطاجيكي', nameEn: 'Tajikistani Somoni', countryAr: 'طاجيكستان', perUsd: 10.6, decimals: 2 },
  { code: 'TMT', symbol: 'T', nameAr: 'المانات التركمانستاني', nameEn: 'Turkmenistani Manat', countryAr: 'تركمانستان', perUsd: 3.5, decimals: 2 },
  { code: 'MVR', symbol: 'Rf', nameAr: 'الروفيا المالديفية', nameEn: 'Maldivian Rufiyaa', countryAr: 'المالديف', perUsd: 15.4, decimals: 2 },
  { code: 'BTN', symbol: 'Nu.', nameAr: 'النغولترم البوتاني', nameEn: 'Bhutanese Ngultrum', countryAr: 'بوتان', perUsd: 84.4, decimals: 2 },
  { code: 'LAK', symbol: '₭', nameAr: 'الكيب اللاوسي', nameEn: 'Lao Kip', countryAr: 'لاوس', perUsd: 21900, decimals: 0 },
  { code: 'FJD', symbol: 'FJ$', nameAr: 'الدولار الفيجي', nameEn: 'Fijian Dollar', countryAr: 'فيجي', perUsd: 2.27, decimals: 2 },
  { code: 'PGK', symbol: 'K', nameAr: 'الكينا البابوية', nameEn: 'Papua New Guinean Kina', countryAr: 'بابوا غينيا الجديدة', perUsd: 3.98, decimals: 2 },
  { code: 'TTD', symbol: 'TT$', nameAr: 'دولار ترينيداد وتوباغو', nameEn: 'Trinidad & Tobago Dollar', countryAr: 'ترينيداد وتوباغو', perUsd: 6.78, decimals: 2 },
  { code: 'BBD', symbol: 'Bds$', nameAr: 'الدولار البربادوسي', nameEn: 'Barbadian Dollar', countryAr: 'بربادوس', perUsd: 2.0, decimals: 2 },
  { code: 'BSD', symbol: 'B$', nameAr: 'الدولار البهامي', nameEn: 'Bahamian Dollar', countryAr: 'البهاما', perUsd: 1.0, decimals: 2 },
  { code: 'CUP', symbol: '$MN', nameAr: 'البيزو الكوبي', nameEn: 'Cuban Peso', countryAr: 'كوبا', perUsd: 24, decimals: 2 },
  { code: 'HTG', symbol: 'G', nameAr: 'الغورد الهايتي', nameEn: 'Haitian Gourde', countryAr: 'هايتي', perUsd: 131, decimals: 0 },
  { code: 'HNL', symbol: 'L', nameAr: 'الليمبيرا الهندوراسية', nameEn: 'Honduran Lempira', countryAr: 'هندوراس', perUsd: 25.2, decimals: 2 },
  { code: 'NIO', symbol: 'C$', nameAr: 'الكوردوبا النيكاراغوية', nameEn: 'Nicaraguan Córdoba', countryAr: 'نيكاراغوا', perUsd: 36.8, decimals: 2 },
  { code: 'PEN', symbol: 'S/', nameAr: 'السول البيروفي', nameEn: 'Peruvian Sol', countryAr: 'بيرو', perUsd: 3.78, decimals: 2 },
  { code: 'SCR', symbol: '₨', nameAr: 'روبية سيشل', nameEn: 'Seychellois Rupee', countryAr: 'سيشل', perUsd: 14.3, decimals: 2 },
  { code: 'CVE', symbol: '$', nameAr: 'إسكودو الرأس الأخضر', nameEn: 'Cape Verdean Escudo', countryAr: 'الرأس الأخضر', perUsd: 101, decimals: 0 },
  { code: 'GMD', symbol: 'D', nameAr: 'الدالاسي الغامبي', nameEn: 'Gambian Dalasi', countryAr: 'غامبيا', perUsd: 71, decimals: 0 },
  { code: 'GNF', symbol: 'FG', nameAr: 'الفرنك الغيني', nameEn: 'Guinean Franc', countryAr: 'غينيا', perUsd: 8600, decimals: 0 },
  { code: 'SLE', symbol: 'Le', nameAr: 'الليون السيراليوني', nameEn: 'Sierra Leonean Leone', countryAr: 'سيراليون', perUsd: 22.6, decimals: 2 },
  { code: 'LRD', symbol: 'L$', nameAr: 'الدولار الليبيري', nameEn: 'Liberian Dollar', countryAr: 'ليبيريا', perUsd: 192, decimals: 0 },
  { code: 'NAD', symbol: 'N$', nameAr: 'الدولار الناميبي', nameEn: 'Namibian Dollar', countryAr: 'ناميبيا', perUsd: 18.1, decimals: 2 },
  { code: 'MWK', symbol: 'MK', nameAr: 'الكواشا الملاوية', nameEn: 'Malawian Kwacha', countryAr: 'ملاوي', perUsd: 1735, decimals: 0 },
  { code: 'ZWL', symbol: 'Z$', nameAr: 'الدولار الزيمبابوي', nameEn: 'Zimbabwean Dollar', countryAr: 'زيمبابوي', perUsd: 26, decimals: 2 },
  { code: 'BIF', symbol: 'FBu', nameAr: 'الفرنك البوروندي', nameEn: 'Burundian Franc', countryAr: 'بوروندي', perUsd: 2900, decimals: 0 },
  { code: 'CDF', symbol: 'FC', nameAr: 'الفرنك الكونغولي', nameEn: 'Congolese Franc', countryAr: 'الكونغو الديمقراطية', perUsd: 2850, decimals: 0 },
  { code: 'ERN', symbol: 'Nfk', nameAr: 'الناكفا الإريترية', nameEn: 'Eritrean Nakfa', countryAr: 'إريتريا', perUsd: 15, decimals: 2 },
  { code: 'SZL', symbol: 'L', nameAr: 'الليلانغيني', nameEn: 'Swazi Lilangeni', countryAr: 'إسواتيني', perUsd: 18.1, decimals: 2 },
  { code: 'LSL', symbol: 'L', nameAr: 'اللوتي الليسوتي', nameEn: 'Lesotho Loti', countryAr: 'ليسوتو', perUsd: 18.1, decimals: 2 },
  { code: 'MOP', symbol: 'MOP$', nameAr: 'الباتاكا الماكاوية', nameEn: 'Macanese Pataca', countryAr: 'ماكاو', perUsd: 8.01, decimals: 2 },
  { code: 'KPW', symbol: '₩', nameAr: 'الوون الكوري الشمالي', nameEn: 'North Korean Won', countryAr: 'كوريا الشمالية', perUsd: 900, decimals: 0 },
  { code: 'WST', symbol: 'T', nameAr: 'التالا الساموية', nameEn: 'Samoan Tala', countryAr: 'ساموا', perUsd: 2.75, decimals: 2 },
  { code: 'TOP', symbol: 'T$', nameAr: 'البانغا التونغية', nameEn: 'Tongan Paʻanga', countryAr: 'تونغا', perUsd: 2.38, decimals: 2 },
  { code: 'VUV', symbol: 'VT', nameAr: 'الفاتو الفانواتي', nameEn: 'Vanuatu Vatu', countryAr: 'فانواتو', perUsd: 120, decimals: 0 },
  { code: 'SBD', symbol: 'SI$', nameAr: 'دولار جزر سليمان', nameEn: 'Solomon Islands Dollar', countryAr: 'جزر سليمان', perUsd: 8.45, decimals: 2 },
  { code: 'XPF', symbol: '₣', nameAr: 'فرنك المحيط الهادئ', nameEn: 'CFP Franc', countryAr: 'بولينيزيا وكاليدونيا', perUsd: 110, decimals: 0 },
  { code: 'XCD', symbol: 'EC$', nameAr: 'دولار شرق الكاريبي', nameEn: 'East Caribbean Dollar', countryAr: 'دول شرق الكاريبي', perUsd: 2.7, decimals: 2 },
  { code: 'ANG', symbol: 'ƒ', nameAr: 'غيلدر الأنتيل', nameEn: 'Netherlands Antillean Guilder', countryAr: 'كوراساو وسانت مارتن', perUsd: 1.79, decimals: 2 },
  { code: 'AWG', symbol: 'ƒ', nameAr: 'فلورين أروبا', nameEn: 'Aruban Florin', countryAr: 'أروبا', perUsd: 1.79, decimals: 2 },
  { code: 'BZD', symbol: 'BZ$', nameAr: 'دولار بليز', nameEn: 'Belize Dollar', countryAr: 'بليز', perUsd: 2.0, decimals: 2 },
  { code: 'GYD', symbol: 'G$', nameAr: 'دولار غيانا', nameEn: 'Guyanese Dollar', countryAr: 'غيانا', perUsd: 209, decimals: 0 },
  { code: 'SRD', symbol: '$', nameAr: 'دولار سورينام', nameEn: 'Surinamese Dollar', countryAr: 'سورينام', perUsd: 35.4, decimals: 2 },
  { code: 'BMD', symbol: 'BD$', nameAr: 'دولار برمودا', nameEn: 'Bermudian Dollar', countryAr: 'برمودا', perUsd: 1.0, decimals: 2 },
  { code: 'KYD', symbol: 'CI$', nameAr: 'دولار جزر كايمان', nameEn: 'Cayman Islands Dollar', countryAr: 'جزر كايمان', perUsd: 0.83, decimals: 2 },
  { code: 'STN', symbol: 'Db', nameAr: 'دوبرا ساو تومي', nameEn: 'São Tomé Dobra', countryAr: 'ساو تومي وبرينسيبي', perUsd: 22.5, decimals: 2 },
  { code: 'SSP', symbol: '£', nameAr: 'جنيه جنوب السودان', nameEn: 'South Sudanese Pound', countryAr: 'جنوب السودان', perUsd: 3200, decimals: 0 },
];

// Deduplicate just in case any ISO code was listed twice
export const UNIQUE_WORLD_CURRENCIES: WorldCurrency[] = Array.from(
  new Map(WORLD_CURRENCIES.map((c) => [c.code, c])).values()
);

export function getCurrencyByCode(code: string): WorldCurrency {
  return (
    UNIQUE_WORLD_CURRENCIES.find((c) => c.code === code) ||
    UNIQUE_WORLD_CURRENCIES[0]
  );
}

export function formatPrice(amountIqd: number, currencyCode: string): string {
  const currency = getCurrencyByCode(currencyCode);
  if (currency.code === 'IQD') {
    const rounded = Math.round(amountIqd);
    return `${rounded.toLocaleString('en-US')} ${currency.symbol}`;
  }

  const amountInUsd = amountIqd / IQD_PER_USD;
  const converted = amountInUsd * currency.perUsd;

  if (currency.decimals === 0) {
    return `${Math.round(converted).toLocaleString('en-US')} ${currency.symbol}`;
  }

  const formatted = converted.toLocaleString('en-US', {
    minimumFractionDigits: currency.decimals,
    maximumFractionDigits: currency.decimals,
  });

  if (['USD', 'CAD', 'AUD', 'NZD', 'HKD', 'SGD', 'GBP', 'EUR'].includes(currency.code)) {
    return `${currency.symbol}${formatted}`;
  }
  return `${formatted} ${currency.symbol}`;
}
