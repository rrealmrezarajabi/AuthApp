<div dir="rtl" align="right">

# مستند جریان لاگین پروژه

## خلاصه

- اپ فرانت با Vite/React ساخته شده و فقط سمت کلاینت را دارد؛ بک‌اند فرضی روی `http://localhost:3000/api` است.
- احراز هویت با توکن انجام می‌شود: بعد از لاگین، توکن در `localStorage` ذخیره می‌شود و به هدر `Authorization: Bearer ...` افزوده می‌گردد.
- در رفرش صفحه، توکن از `localStorage` خوانده می‌شود تا کاربر لاگین‌مانده بماند.
- نگهبانی مسیرها و نمایش خطا در حال حاضر وجود ندارد و باید اضافه شوند.

## اجزای مهم

- `src/api/axiosClient.js`: ساخت کلاینت Axios با `baseURL` و `Content-Type`.
- `src/api/authApi.js`: متدهای `login`, `register`, `getProfile` که به روت‌های بک‌اند می‌زنند.
- `src/context/AuthContext.jsx`: نگه‌داری `token`, متدهای `login/logout`, ست‌کردن هدر Authorization و بازیابی توکن از `localStorage`.
- `src/hooks/useLogin.js`: هوک react-query برای صدا زدن `authApi.login` و روی موفقیت، انتقال توکن به `AuthContext`.
- `src/pages/Login.jsx`: فرم ساده با React Hook Form که `email/password` را ارسال و `useLogin` را فراخوانی می‌کند.

## جریان لاگین فعلی (گام به گام)

1. کاربر در صفحه `Login.jsx` ایمیل و پسورد را پر و فرم را سابمیت می‌کند (`handleSubmit` → `onSubmit`).
2. `onSubmit` داده‌ها را به `loginMutation.mutate` می‌دهد. این متد از `useLogin` می‌آید.
3. `useLogin` از react-query `useMutation` استفاده می‌کند:
   - `mutationFn`: `authApi.login(data)` → `POST /auth/login` با Axios.
   - `onSuccess`: توکن را از `res.data.token` می‌گیرد و `login(token)` را از `AuthContext` صدا می‌زند.
4. `AuthContext.login`:
   - `setToken(newToken)` در state.
   - ذخیره توکن در `localStorage`.
   - افزودن هدر پیش‌فرض `Authorization` به `axiosClient` برای همه درخواست‌های بعدی.
5. بارگذاری مجدد صفحه:
   - `useEffect` در `AuthProvider` توکن موجود در `localStorage` را می‌خواند و همان هدر `Authorization` را دوباره تنظیم می‌کند.
6. خروج (`logout`):
   - توکن از state و `localStorage` حذف می‌شود و هدر Authorization پاک می‌شود.

## نقاط قابل بهبود فعلی

- مسیرهای محافظت‌شده و ریدایرکت بر اساس `isAuthenticated` وجود ندارد (Dashboard همیشه قابل دسترسی است).
- مدیریت خطا/پیام موفقیت لاگین در UI پیاده نشده است.
- ریدایرکت بعد از لاگین به داشبورد انجام نمی‌شود.
- `SignUp` و `DashBoard` خالی هستند.
- استفاده از `localStorage` برای توکن آسیب‌پذیری XSS دارد؛ در محیط واقعی بهتر است از کوکی HTTP-only استفاده شود یا سخت‌گیری امنیتی بیشتری اعمال شود.
- refresh token، تمدید توکن و handle 401 پیاده نشده است.

## پیشنهاد پیاده‌سازی برای پروژه‌های بعدی

1. **معماری و پیکربندی**
   - آدرس‌های بک‌اند را در متغیر محیطی (`VITE_API_URL`) نگه دارید و در Axios استفاده کنید.
   - timeout و خطایابی Axios را با اینترسپتورهای request/response مدیریت کنید.
2. **امنیت و ذخیره‌سازی**
   - اگر ممکن است از کوکی HTTP-only + SameSite=Strict + Secure استفاده کنید. در این حالت نیاز به ست‌کردن هدر Authorization سمت کلاینت نیست و سشن با کوکی مدیریت می‌شود.
   - اگر مجبور به توکن در فرانت هستید: حداقل از `sessionStorage` یا encrypt-in-memory (مثلاً Zustand) و CSP سخت‌گیرانه استفاده کنید.
3. **مسیرهای محافظت‌شده**
   - یک کامپوننت `ProtectedRoute` بسازید که اگر `!isAuthenticated` بود به `/login` ریدایرکت کند؛ در غیر این صورت، فرزند را رندر کند.
   - برای صفحات مهم (Dashboard) از این محافظ استفاده کنید.
4. **مدیریت چرخه توکن**
   - API بک‌اند: روی 401 توکن refresh را صدا بزنید؛ اگر موفق، درخواست اصلی را تکرار کنید و در غیر این صورت logout و ریدایرکت.
   - توکن‌های refresh را فقط در کوکی HTTP-only نگه دارید؛ access token کوتاه‌عمر باشد (مثلاً 5–15 دقیقه).
5. **تجربه کاربری**
   - نمایش خطا/موفقیت در فرم لاگین (toast یا پیام زیر فیلد).
   - دکمه Login در حالت لود disable شود؛ فرم معتبرسازی مناسب داشته باشد.
   - بعد از موفقیت، ریدایرکت به مسیر درخواست‌شده قبلی (`redirectTo`) یا `/dashboard`.
6. **تست و پایش**
   - تست واحد برای هوک‌های auth (مثلاً `useLogin`) با mock Axios.
   - تست E2E (Cypress/Playwright) برای سناریوهای لاگین/لاگ‌اوت و نگهبانی مسیر.
   - لاگ سرور و هندل خطای مرکزی در بک‌اند برای ردگیری تلاش‌های لاگین ناموفق.
7. **ساختار کد پیشنهادی**
   - `api/` برای endpointها + اینترسپتورها.
   - `auth/` یا `context/` برای provider و محافظ‌ها.
   - `hooks/` برای هوک‌های react-query (`useLogin`, `useProfile`, `useLogout`).
   - `components/auth/` برای فرم‌های Login/Signup و ProtectedRoute.

## چک‌لیست کوتاه برای اضافه‌کردن لاگین امن

- تنظیم `.env` برای آدرس API و کلیدها.
- نوشتن اینترسپتورهای Axios برای هدر Authorization و refresh.
- ساخت `ProtectedRoute` و ریدایرکت غیرمجازها.
- نمایش پیام خطا/لودینگ در فرم‌ها.
- تصمیم درباره محل نگه‌داری توکن (ترجیحاً کوکی HTTP-only).
- تست واحد + E2E برای سناریوهای ورود/خروج/انقضا.

</div>
