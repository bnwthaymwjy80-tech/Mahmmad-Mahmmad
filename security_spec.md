# Firestore Security Specification — Alians Shop

## 1. Data Invariants
1. Every `/users/{userId}` document belongs strictly to the verified Google account whose `request.auth.uid == userId` and `request.auth.token.email_verified == true`.
2. PII (`email`, `customerPhone`, `customerAddress`) is never publicly readable or readable by other signed-in users.
3. Every `/users/{userId}/orders/{orderId}` document must have `userId == request.auth.uid`, valid enum values (`status`, `paymentMethod`), positive/non-negative numeric totals, bounded string lengths, and server-validated `createdAt == request.time`.
4. Clients cannot spoof `uid`, `userId`, or `createdAt`, nor inject undeclared ghost fields.
5. Public `/reviews/{reviewId}` documents contain zero PII (only `author` display name, `rating` 1..5, `comment`, `productId`) and can ONLY be created by signed-in verified Google users matching `request.auth.uid == userId`.

## 2. Adversarial "Dirty Dozen" Payloads (Expected: PERMISSION_DENIED)
1. Unauthenticated read of `/users/u1`.
2. Authenticated user `u2` reading `/users/u1` (cross-user PII leak).
3. Unverified email user writing `/users/u1`.
4. User `u1` creating `/users/u1` with `uid: "u2"` (identity spoofing).
5. User `u1` creating `/users/u1` with ghost field `isAdmin: true` (shadow field injection).
6. User `u1` creating `/users/u1` with `displayName` > 100 chars (resource exhaustion).
7. User `u1` updating `/users/u1` to mutate `createdAt` or `uid` (immutable field bypass).
8. User `u1` creating `/users/u1` with client-forged `createdAt` != `request.time`.
9. User `u2` listing `/users/u1/orders`.
10. User `u1` creating `/users/u1/orders/ord1` with `status: "completed"` (invalid status enum).
11. User `u1` creating `/users/u1/orders/ord1` with `totalIqd: -500` (negative price tampering).
12. User `u1` creating `/users/u1/orders/very_long_id_over_128_chars...` (ID poisoning).
13. Unauthenticated user creating `/reviews/rev1`.
14. User `u1` creating `/reviews/rev1` with `rating: 10` or `userId: "u2"`.
