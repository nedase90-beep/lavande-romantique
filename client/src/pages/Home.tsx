import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Flame,
  Check,
  ChevronLeft,
  Clock3,
  Flower2,
  Gift,
  Heart,
  Instagram,
  MapPin,
  Menu,
  Minus,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Trash2,
  Truck,
  X,
} from "lucide-react";

const heroImage = "/manus-storage/lavande-hero_9829ea59.png";

const products = [
  {
    id: 1,
    name: "لافندر رومانتيك",
    subtitle: "عطر أو دو بارفان · 50 مل",
    category: "عطور",
    price: 39,
    oldPrice: 49,
    badge: "الأكثر مبيعاً",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85",
    tone: "#dfcfdf",
  },
  {
    id: 2,
    name: "شمعة الرمان والورد",
    subtitle: "شمع الصويا الطبيعي · 220 غ",
    category: "شموع",
    price: 16,
    oldPrice: null,
    badge: "صنع بحب",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85",
    tone: "#e6c3c8",
  },
  {
    id: 3,
    name: "بخور بيت العود",
    subtitle: "مزيج شرقي دافئ · 80 غ",
    category: "بخور",
    price: 13,
    oldPrice: null,
    badge: "جديد",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85",
    tone: "#d9c5a7",
  },
  {
    id: 4,
    name: "باقة المساء الهادئ",
    subtitle: "عطر + شمعة + بطاقة إهداء",
    category: "هدايا",
    price: 49,
    oldPrice: 62,
    badge: "هدية مثالية",
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=900&q=85",
    tone: "#d1d7df",
  },
  {
    id: 5,
    name: "فانيلا وعود",
    subtitle: "زيت عطري مركز · 30 مل",
    category: "عطور",
    price: 22,
    oldPrice: null,
    badge: "محدود",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85",
    tone: "#e6d3af",
  },
  {
    id: 6,
    name: "شمعة ضوء القمر",
    subtitle: "لافندر ومسك أبيض · 180 غ",
    category: "شموع",
    price: 15,
    oldPrice: null,
    badge: "مفضلتنا",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85",
    tone: "#c9c4d9",
  },
];

type Product = (typeof products)[number];
type CartItem = { product: Product; quantity: number };

const categories = ["الكل", "عطور", "شموع", "بخور", "هدايا"];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const filteredProducts = useMemo(
    () => activeCategory === "الكل" ? products : products.filter((product) => product.category === activeCategory),
    [activeCategory],
  );

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const delivery = subtotal === 0 || subtotal >= 35 ? 0 : 3;
  const total = subtotal + delivery;

  function announce(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2800);
  }

  function addToCart(product: Product) {
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) return current.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { product, quantity: 1 }];
    });
    announce(`تمت إضافة «${product.name}» إلى السلة`);
  }

  function changeQuantity(productId: number, amount: number) {
    setCart((current) => current.flatMap((item) => {
      if (item.product.id !== productId) return [item];
      const nextQuantity = item.quantity + amount;
      return nextQuantity > 0 ? [{ ...item, quantity: nextQuantity }] : [];
    }));
  }

  function removeFromCart(productId: number) {
    setCart((current) => current.filter((item) => item.product.id !== productId));
  }

  function goToProducts() {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div dir="rtl" className="min-h-screen overflow-x-hidden bg-[#fcf8f1] text-[#332b31]">
      <div className="bg-[#4c3b4b] px-4 py-2 text-center text-[11px] font-medium tracking-wide text-[#f8edd8] sm:text-xs">
        التوصيل داخل الأردن فقط · توصيل مجاني للطلبات فوق 35 د.أ
      </div>

      <header className="sticky top-0 z-40 border-b border-[#eadfd7]/80 bg-[#fcf8f1]/95 backdrop-blur-xl">
        <div className="container flex h-[76px] items-center justify-between gap-4">
          <div className="flex items-center gap-3 lg:gap-10">
            <button aria-label="فتح القائمة" onClick={() => setMobileOpen(true)} className="rounded-full p-2 text-[#665174] lg:hidden"><Menu size={22} /></button>
            <a href="#top" className="group flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c6a86d] bg-[#f3e8de] text-[#6e5578] shadow-sm"><Flower2 size={20} strokeWidth={1.4} /></span>
              <span className="leading-none"><span className="display-font block text-[25px] font-semibold tracking-[.02em] text-[#5c4664]">Lavande</span><span className="mt-0.5 block text-[9px] font-semibold tracking-[.34em] text-[#b18c59]">ROMANTIQUE</span></span>
            </a>
            <nav className="hidden items-center gap-7 text-[13px] font-medium text-[#695d67] lg:flex">
              <a className="transition-colors hover:text-[#775586]" href="#products">المتجر</a>
              <a className="transition-colors hover:text-[#775586]" href="#story">قصتنا</a>
              <a className="transition-colors hover:text-[#775586]" href="#gifts">هدايا المناسبات</a>
              <a className="transition-colors hover:text-[#775586]" href="#contact">تواصل معنا</a>
            </nav>
          </div>
          <div className="flex items-center gap-1 text-[#665174] sm:gap-2">
            <button aria-label="البحث" onClick={() => setSearchOpen((current) => !current)} className="rounded-full p-2.5 transition-colors hover:bg-[#f1e5ee]"><Search size={19} strokeWidth={1.7} /></button>
            <button aria-label="المفضلة" onClick={() => announce("قائمة المفضلة ستكون متاحة قريباً")} className="hidden rounded-full p-2.5 transition-colors hover:bg-[#f1e5ee] sm:block"><Heart size={19} strokeWidth={1.7} /></button>
            <button aria-label="سلة المشتريات" onClick={() => setCartOpen(true)} className="relative rounded-full p-2.5 transition-colors hover:bg-[#f1e5ee]"><ShoppingBag size={20} strokeWidth={1.7} />{totalItems > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#b18c59] px-1 text-[10px] font-bold text-white">{totalItems}</span>}</button>
          </div>
        </div>
        {searchOpen && <div className="border-t border-[#eadfd7] bg-[#fffdf9] px-4 py-3"><div className="container relative"><Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[#ad9da6]" size={17} /><input autoFocus className="w-full rounded-full border border-[#e8ddd5] bg-[#fcf8f1] py-3 pr-11 pl-4 text-sm outline-none transition focus:border-[#a584b0]" placeholder="ابحثي عن رائحة تحبينها..." /></div></div>}
      </header>

      {mobileOpen && <div className="fixed inset-0 z-50 bg-[#312431]/30 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)}><aside onClick={(event) => event.stopPropagation()} className="h-full w-[82%] max-w-sm bg-[#fffdf9] p-6 shadow-2xl"><div className="flex items-center justify-between"><span className="display-font text-2xl font-semibold text-[#5c4664]">Lavande</span><button onClick={() => setMobileOpen(false)} className="rounded-full p-2 hover:bg-[#f1e5ee]"><X size={20} /></button></div><div className="mt-14 flex flex-col gap-6 text-lg text-[#544755]"><a onClick={() => setMobileOpen(false)} href="#products">المتجر</a><a onClick={() => setMobileOpen(false)} href="#story">قصتنا</a><a onClick={() => setMobileOpen(false)} href="#gifts">هدايا المناسبات</a><a onClick={() => setMobileOpen(false)} href="#contact">تواصل معنا</a></div><div className="mt-16 rounded-3xl bg-[#f3e8de] p-5 text-sm text-[#6c5663]"><MapPin size={20} className="mb-3 text-[#b18c59]" /><p className="leading-7">نصنع لحظات جميلة ونوصلها لباب بيتك في جميع محافظات الأردن.</p></div></aside></div>}

      <main id="top">
        <section className="container pt-5 sm:pt-7">
          <div className="hero-glow relative isolate min-h-[530px] overflow-hidden rounded-[28px] bg-[#50425a] sm:min-h-[600px] lg:min-h-[620px]">
            <img src={heroImage} alt="عطر لافندر وشمعة في حديقة مزهرة" className="absolute inset-0 h-full w-full object-cover object-center" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(50,37,54,.9)_0%,rgba(68,48,73,.60)_34%,rgba(53,39,61,.10)_76%,rgba(43,31,48,.25)_100%)]" />
            <div className="absolute inset-y-0 right-0 hidden w-[28%] bg-gradient-to-l from-[#5b3e65]/35 to-transparent lg:block" />
            <div className="relative z-10 flex min-h-[530px] items-end px-7 pb-10 sm:min-h-[600px] sm:px-12 sm:pb-14 lg:min-h-[620px] lg:items-center lg:px-16 lg:pb-0">
              <div className="max-w-[530px] text-white">
                <div className="animate-rise mb-4 flex items-center gap-3 text-[11px] font-medium tracking-[.18em] text-[#f0d8a4] sm:text-xs"><span className="h-px w-9 bg-[#d1ad6d]" /> عطور · شموع · لحظات</div>
                <h1 className="display-font animate-rise text-[54px] font-medium leading-[.9] tracking-[-.02em] text-[#fffaf4] delay-1 sm:text-[76px] lg:text-[92px]">رائحة تشبه<br /><em className="font-normal text-[#e7c995]">الحب.</em></h1>
                <p className="animate-rise mt-6 max-w-[410px] text-sm leading-8 text-white/80 delay-2 sm:text-base">اكتشفي عالمًا من الروائح الهادئة، صُنعت يدويًا لتملأ مساحتك بدفء لا يُنسى.</p>
                <div className="animate-rise mt-8 flex flex-wrap items-center gap-3 delay-3"><button onClick={goToProducts} className="btn-lift flex items-center gap-3 rounded-full bg-[#f8edd8] px-6 py-3.5 text-sm font-semibold text-[#544050]">تسوقي المجموعة <ArrowLeft size={17} /></button><a href="#story" className="rounded-full border border-white/35 px-5 py-3 text-sm text-white/90 transition hover:border-white hover:bg-white/10">اكتشفي قصتنا</a></div>
              </div>
            </div>
            <div className="absolute bottom-5 left-7 hidden items-center gap-3 text-[10px] font-medium tracking-[.16em] text-white/65 sm:flex"><span>SCROLL TO EXPLORE</span><span className="h-px w-14 bg-white/50" /></div>
            <div className="animate-float absolute bottom-8 right-7 hidden w-28 rounded-2xl border border-white/25 bg-white/15 p-3 text-center shadow-xl backdrop-blur-md lg:block"><Sparkles className="mx-auto mb-2 text-[#f1d49b]" size={17} /><p className="text-[10px] leading-5 text-white/90">مصنوع بحب<br />في الأردن</p></div>
          </div>
        </section>

        <section className="container grid grid-cols-2 gap-3 py-8 sm:grid-cols-4 sm:gap-5 sm:py-12">
          {[{icon: Truck, title: "توصيل سريع", detail: "لكل محافظات الأردن"}, {icon: Flame, title: "صناعة يدوية", detail: "تفاصيل تحكى بحب"}, {icon: ShieldCheck, title: "جودة موثوقة", detail: "مكونات مختارة بعناية"}, {icon: Gift, title: "تغليف أنيق", detail: "جاهز للإهداء"}].map(({ icon: Icon, title, detail }) => <div key={title} className="flex items-start gap-3 border-l border-[#e7dcd3] p-2 first:border-l-0 sm:justify-center sm:p-3"><div className="rounded-full bg-[#f2e7ee] p-2.5 text-[#80638c]"><Icon size={17} strokeWidth={1.7} /></div><div><h3 className="text-xs font-bold text-[#50414f] sm:text-sm">{title}</h3><p className="mt-1 text-[10px] text-[#93848d] sm:text-xs">{detail}</p></div></div>)}
        </section>

        <section id="products" className="bg-[#f4ede7] px-4 py-16 sm:px-6 sm:py-20">
          <div className="container">
            <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-3 text-[11px] font-bold tracking-[.18em] text-[#b18c59]">THE COLLECTION</p><h2 className="display-font text-5xl font-medium text-[#514052] sm:text-6xl">اختاري رائحتك</h2><p className="mt-3 max-w-md text-sm leading-7 text-[#857681]">قطع صغيرة، أثرها كبير. كل منتج يُحضّر بعناية ليضيف لمسة من الجمال إلى يومك.</p></div><a href="#products" className="flex items-center gap-2 text-sm font-semibold text-[#6e5578] transition hover:text-[#b18c59]">شاهدي كل المنتجات <ChevronLeft size={17} /></a></div>
            <div className="mb-8 flex gap-2 overflow-x-auto pb-2 text-sm"><div className="flex min-w-max gap-2 rounded-full border border-[#e4d8cf] bg-[#fcf8f1] p-1">{categories.map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={`rounded-full px-5 py-2 transition ${activeCategory === category ? "bg-[#665174] text-white shadow-sm" : "text-[#776a73] hover:bg-[#eee3f0]"}`}>{category}</button>)}</div></div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{filteredProducts.map((product, index) => <article key={product.id} className="product-card overflow-hidden rounded-[22px] border border-[#eadfd7] bg-[#fffdf9]" style={{ animationDelay: `${index * 80}ms` }}><div className="relative aspect-[1.08] overflow-hidden" style={{ backgroundColor: product.tone }}><img src={product.image} alt={product.name} className="h-full w-full object-cover" /><span className="absolute right-4 top-4 rounded-full bg-[#fffdf9]/90 px-3 py-1.5 text-[10px] font-bold text-[#6b5274] shadow-sm backdrop-blur">{product.badge}</span><button aria-label={`إضافة ${product.name} للمفضلة`} onClick={() => announce("تم حفظ المنتج في المفضلة")} className="absolute left-4 top-4 rounded-full bg-[#fffdf9]/85 p-2 text-[#705a76] shadow-sm backdrop-blur transition hover:bg-white"><Heart size={16} strokeWidth={1.7} /></button></div><div className="p-5"><div className="flex items-start justify-between gap-3"><div><h3 className="text-base font-bold text-[#4e3c4f]">{product.name}</h3><p className="mt-1.5 text-xs text-[#97868f]">{product.subtitle}</p></div><div className="text-left"><div className="whitespace-nowrap text-base font-bold text-[#604c68]">{product.price} <span className="text-[10px] font-medium">د.أ</span></div>{product.oldPrice && <div className="text-[10px] text-[#ae9da1] line-through">{product.oldPrice} د.أ</div>}</div></div><button onClick={() => addToCart(product)} className="btn-lift mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-[#cdbad0] bg-[#f8f1f7] py-3 text-xs font-bold text-[#6b5072] transition hover:bg-[#6b5072] hover:text-white"><ShoppingBag size={16} strokeWidth={1.8} /> أضيفي إلى السلة</button></div></article>)}</div>
          </div>
        </section>

        <section id="story" className="container grid items-center gap-10 py-20 sm:py-28 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <div className="relative mx-auto w-full max-w-md"><div className="absolute -inset-4 -z-10 rounded-[50%] border border-[#d7c2c8]" /><div className="absolute -inset-8 -z-10 rounded-[50%] border border-[#ede1d8]" /><div className="relative aspect-[.9] overflow-hidden rounded-[48%_48%_22px_22px] bg-[#e9dce6]"><img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=85" alt="زهور بنفسجية مختارة بعناية" className="h-full w-full object-cover" /></div><div className="absolute -bottom-5 -right-5 rounded-full bg-[#665174] px-5 py-4 text-center text-white shadow-lg"><span className="display-font block text-2xl">2021</span><span className="text-[9px] text-white/70">منذ البداية</span></div></div>
          <div className="max-w-xl"><p className="mb-3 text-[11px] font-bold tracking-[.18em] text-[#b18c59]">OUR STORY</p><h2 className="display-font text-5xl font-medium leading-[.95] text-[#514052] sm:text-6xl">نصنع الجمال<br /><em className="font-normal text-[#8e739e]">من أبسط التفاصيل.</em></h2><p className="mt-7 text-sm leading-8 text-[#786a73]">بدأت Lavande Romantique من حبّ صغير للعطور التي تبقى في الذاكرة. نختار كل نوتة عطرية، كل فتيل، وكل زهرة مجففة كأنها هدية لشخص نحبه.</p><p className="mt-4 text-sm leading-8 text-[#786a73]">نؤمن أن الرفاهية ليست صخبًا؛ إنها لحظة هدوء، ضوء شمعة، ورائحة تأخذك إلى مكان أجمل.</p><a href="#contact" className="mt-8 inline-flex items-center gap-2 border-b border-[#b18c59] pb-2 text-sm font-bold text-[#604b68] transition hover:text-[#b18c59]">تعرفي علينا أكثر <ArrowLeft size={16} /></a></div>
        </section>

        <section id="gifts" className="relative overflow-hidden bg-[#514258] px-4 py-16 text-white sm:px-6 sm:py-20"><div className="absolute -left-24 -top-24 h-64 w-64 rounded-full border border-white/10" /><div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full border border-white/10" /><div className="container relative grid items-center gap-8 lg:grid-cols-[1fr_auto]"><div><p className="mb-3 text-[11px] font-bold tracking-[.2em] text-[#e3c48b]">A LITTLE SOMETHING SPECIAL</p><h2 className="display-font text-5xl font-medium sm:text-6xl">هدية تقول<br /><em className="font-normal text-[#e4c895]">أحبك.</em></h2><p className="mt-4 max-w-lg text-sm leading-8 text-white/70">اختاري باقة من مجموعتنا، وسنغلفها لك بعناية ونضيف بطاقة برسالتك الخاصة.</p></div><button onClick={() => { setActiveCategory("هدايا"); goToProducts(); }} className="btn-lift flex w-fit items-center gap-3 rounded-full bg-[#f8edd8] px-7 py-4 text-sm font-bold text-[#5b435d]">اكتشفي باقات الهدايا <ArrowLeft size={17} /></button></div></section>

        <section className="container py-16 sm:py-20"><div className="rounded-[26px] bg-[#f0e4e7] px-6 py-12 text-center sm:px-10"><Sparkles className="mx-auto mb-4 text-[#a47e51]" size={23} strokeWidth={1.5} /><p className="mb-3 text-[11px] font-bold tracking-[.18em] text-[#b18c59]">A NOTE FROM US</p><h2 className="display-font text-4xl font-medium text-[#5c4664] sm:text-5xl">كل طلبية تحمل جزءًا من قلبنا</h2><p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#796d75]">نغلف كل طلبية يدويًا ونرسلها إليك داخل الأردن خلال 2–3 أيام عمل، لأن التفاصيل الصغيرة تصنع الفرق.</p><div className="mx-auto mt-7 flex max-w-lg flex-col gap-2 sm:flex-row"><input className="w-full rounded-full border border-[#dfcfd2] bg-[#fffaf9] px-5 py-3 text-right text-sm outline-none placeholder:text-[#b19fa6] focus:border-[#9a7aa4]" placeholder="بريدك الإلكتروني" type="email" /><button onClick={() => announce("شكرًا لك، سنبقيك على اطلاع بأجمل الأخبار")} className="btn-lift whitespace-nowrap rounded-full bg-[#665174] px-6 py-3 text-sm font-bold text-white">انضمي للقائمة</button></div></div></section>
      </main>

      <footer id="contact" className="border-t border-[#eadfd7] bg-[#fffdf9] px-4 pb-8 pt-12"><div className="container grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_.8fr_.8fr_1fr]"><div><a href="#top" className="flex items-center gap-2"><span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c6a86d] bg-[#f3e8de] text-[#6e5578]"><Flower2 size={20} strokeWidth={1.4} /></span><span className="leading-none"><span className="display-font block text-2xl font-semibold text-[#5c4664]">Lavande</span><span className="mt-0.5 block text-[8px] font-semibold tracking-[.34em] text-[#b18c59]">ROMANTIQUE</span></span></a><p className="mt-5 max-w-xs text-xs leading-7 text-[#8b7c84]">عطور وشموع تُصنع ببطء، لتمنح يومك لحظة أجمل.</p><div className="mt-5 flex gap-2"><a href="#contact" aria-label="إنستغرام" className="rounded-full bg-[#f3e8de] p-2.5 text-[#6c5572] transition hover:bg-[#e8d9e9]"><Instagram size={16} /></a><a href="#contact" aria-label="تواصل معنا" className="rounded-full bg-[#f3e8de] p-2.5 text-[#6c5572] transition hover:bg-[#e8d9e9]"><MapPin size={16} /></a></div></div><div><h3 className="mb-4 text-sm font-bold text-[#554250]">تسوقي</h3><div className="flex flex-col gap-3 text-xs text-[#8b7c84]"><a href="#products" className="hover:text-[#6d5275]">كل المنتجات</a><a href="#products" onClick={() => setActiveCategory("عطور")} className="hover:text-[#6d5275]">العطور</a><a href="#products" onClick={() => setActiveCategory("شموع")} className="hover:text-[#6d5275]">الشموع</a><a href="#gifts" className="hover:text-[#6d5275]">باقات الهدايا</a></div></div><div><h3 className="mb-4 text-sm font-bold text-[#554250]">مساعدتك</h3><div className="flex flex-col gap-3 text-xs text-[#8b7c84]"><a href="#contact" className="hover:text-[#6d5275]">تتبع الطلب</a><a href="#contact" className="hover:text-[#6d5275]">سياسة الاستبدال</a><a href="#contact" className="hover:text-[#6d5275]">الأسئلة الشائعة</a><a href="#contact" className="hover:text-[#6d5275]">اتصل بنا</a></div></div><div><h3 className="mb-4 text-sm font-bold text-[#554250]">نحن هنا لأجلك</h3><div className="flex flex-col gap-4 text-xs text-[#8b7c84]"><p className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-[#b18c59]" />نشحن إلى جميع محافظات الأردن</p><p className="flex items-start gap-2"><Clock3 size={16} className="mt-0.5 shrink-0 text-[#b18c59]" />السبت – الخميس · 9 ص – 6 م</p></div></div></div><div className="container mt-10 flex flex-col justify-between gap-2 border-t border-[#eadfd7] pt-5 text-[10px] text-[#aa9ba1] sm:flex-row"><span>© 2024 Lavande Romantique. صُنع بحب في الأردن.</span><span>الدفع عند الاستلام متاح داخل الأردن</span></div></footer>

      {notice && <div role="status" className="fixed bottom-5 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#4c3b4b] px-5 py-3 text-xs font-medium text-white shadow-2xl"><Check size={16} className="text-[#e4c895]" />{notice}</div>}

      {cartOpen && <div className="fixed inset-0 z-50 bg-[#312431]/35 backdrop-blur-sm" onClick={() => setCartOpen(false)}><aside onClick={(event) => event.stopPropagation()} className="absolute left-0 top-0 flex h-full w-full max-w-md flex-col bg-[#fffdf9] shadow-2xl"><div className="flex items-center justify-between border-b border-[#eadfd7] px-6 py-5"><div><h2 className="display-font text-3xl font-medium text-[#5a4562]">سلة مشترياتك</h2><p className="mt-1 text-[11px] text-[#96868e]">{totalItems} منتجات مختارة</p></div><button onClick={() => setCartOpen(false)} className="rounded-full p-2 hover:bg-[#f3e8de]"><X size={21} /></button></div>{cart.length === 0 ? <div className="flex flex-1 flex-col items-center justify-center px-10 text-center"><div className="mb-5 rounded-full bg-[#f3e8de] p-5 text-[#886b91]"><ShoppingBag size={30} strokeWidth={1.3} /></div><h3 className="text-lg font-bold text-[#574656]">السلة بانتظارك</h3><p className="mt-2 text-sm leading-7 text-[#94858d]">أضيفي رائحتك المفضلة، ودعي الباقي علينا.</p><button onClick={() => { setCartOpen(false); goToProducts(); }} className="btn-lift mt-6 rounded-full bg-[#665174] px-6 py-3 text-sm font-bold text-white">تصفحي المنتجات</button></div> : <><div className="flex-1 overflow-y-auto px-6 py-5">{cart.map(({ product, quantity }) => <div key={product.id} className="flex gap-3 border-b border-[#eee4dc] py-4 first:pt-0"><img src={product.image} alt={product.name} className="h-20 w-20 rounded-2xl object-cover" /><div className="min-w-0 flex-1"><div className="flex justify-between gap-2"><h3 className="truncate text-sm font-bold text-[#584555]">{product.name}</h3><button aria-label={`حذف ${product.name}`} onClick={() => removeFromCart(product.id)} className="text-[#b5a4a9] hover:text-[#a24d5a]"><Trash2 size={15} /></button></div><p className="mt-1 text-xs text-[#94858d]">{product.price} د.أ</p><div className="mt-3 flex items-center justify-between"><div className="flex items-center gap-3 rounded-full border border-[#e7dcd4] px-2 py-1"><button onClick={() => changeQuantity(product.id, -1)} className="rounded-full p-0.5 hover:bg-[#f2e6ee]"><Minus size={13} /></button><span className="min-w-3 text-center text-xs font-bold">{quantity}</span><button onClick={() => changeQuantity(product.id, 1)} className="rounded-full p-0.5 hover:bg-[#f2e6ee]"><Plus size={13} /></button></div><strong className="text-sm text-[#604b68]">{product.price * quantity} د.أ</strong></div></div></div>)}</div><div className="border-t border-[#eadfd7] bg-[#fcf8f1] px-6 py-5"><div className="mb-2 flex justify-between text-xs text-[#84757e]"><span>المجموع الفرعي</span><span>{subtotal} د.أ</span></div><div className="mb-3 flex justify-between text-xs text-[#84757e]"><span>التوصيل</span><span className={delivery === 0 ? "text-[#6c8a68]" : ""}>{delivery === 0 ? "مجاني" : `${delivery} د.أ`}</span></div><div className="mb-5 flex justify-between border-t border-[#e3d7cf] pt-3 text-base font-bold text-[#4f3d50]"><span>الإجمالي</span><span>{total} د.أ</span></div><button onClick={() => setCheckoutOpen(true)} className="btn-lift flex w-full items-center justify-center gap-2 rounded-full bg-[#665174] py-3.5 text-sm font-bold text-white">إتمام الطلب <ArrowLeft size={17} /></button><p className="mt-3 text-center text-[10px] text-[#9c8c94]">الدفع عند الاستلام · التوصيل داخل الأردن</p></div></>}</aside></div>}

      {checkoutOpen && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#312431]/45 p-4 backdrop-blur-sm" onClick={() => setCheckoutOpen(false)}><div onClick={(event) => event.stopPropagation()} className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[26px] bg-[#fffdf9] p-6 shadow-2xl sm:p-8"><div className="flex items-start justify-between"><div><p className="mb-2 text-[10px] font-bold tracking-[.18em] text-[#b18c59]">ORDER DETAILS</p><h2 className="display-font text-4xl font-medium text-[#59435f]">أين نرسلها؟</h2><p className="mt-2 text-xs text-[#93848d]">أدخلي بياناتك وسنتواصل معك لتأكيد الطلب.</p></div><button onClick={() => setCheckoutOpen(false)} className="rounded-full p-2 hover:bg-[#f3e8de]"><X size={20} /></button></div><form className="mt-7 space-y-4" onSubmit={(event) => { event.preventDefault(); setCheckoutOpen(false); setCart([]); setCartOpen(false); announce("تم استلام طلبك! سنتواصل معك قريباً"); }}><label className="block text-xs font-bold text-[#62525e]">الاسم الكامل<input required className="mt-2 w-full rounded-2xl border border-[#e5d9d1] bg-[#fcf8f1] px-4 py-3 text-sm outline-none focus:border-[#9b7aa4]" placeholder="مثال: ليان محمد" /></label><div className="grid gap-4 sm:grid-cols-2"><label className="block text-xs font-bold text-[#62525e]">رقم الهاتف<input required type="tel" className="mt-2 w-full rounded-2xl border border-[#e5d9d1] bg-[#fcf8f1] px-4 py-3 text-sm outline-none focus:border-[#9b7aa4]" placeholder="07X XXX XXXX" /></label><label className="block text-xs font-bold text-[#62525e]">المحافظة<select className="mt-2 w-full appearance-none rounded-2xl border border-[#e5d9d1] bg-[#fcf8f1] px-4 py-3 text-sm outline-none focus:border-[#9b7aa4]"><option>عمّان</option><option>إربد</option><option>الزرقاء</option><option>العقبة</option><option>السلط</option><option>الكرك</option><option>مادبا</option><option>جرش</option><option>عجلون</option><option>المفرق</option><option>الطفيلة</option><option>معان</option></select></label></div><label className="block text-xs font-bold text-[#62525e]">العنوان بالتفصيل<textarea required rows={3} className="mt-2 w-full resize-none rounded-2xl border border-[#e5d9d1] bg-[#fcf8f1] px-4 py-3 text-sm outline-none focus:border-[#9b7aa4]" placeholder="المنطقة، الشارع، أقرب نقطة دالة" /></label><div className="rounded-2xl bg-[#f3e8de] p-4 text-xs leading-6 text-[#786872]"><div className="flex items-center gap-2 font-bold text-[#5f4a63]"><MapPin size={16} /> التوصيل داخل الأردن فقط</div><p className="mt-1">الدفع نقدًا عند الاستلام · التوصيل خلال 2–3 أيام عمل · {delivery === 0 ? "توصيل مجاني" : `رسوم التوصيل ${delivery} د.أ`}</p></div><button type="submit" className="btn-lift mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#665174] py-4 text-sm font-bold text-white">تأكيد الطلب · {total} د.أ <Check size={17} /></button></form></div></div>}
    </div>
  );
}
