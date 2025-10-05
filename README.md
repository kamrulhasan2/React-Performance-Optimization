# Resources:
https://react.dev/reference/dev-tools/react-performance-tracks

# React Performance Optimization: বিস্তারিত আলোচনা

React দিয়ে বানানো ওয়েব অ্যাপ যদি ধীরগতি হয়, তবে ব্যবহারকারী বিরক্ত হয়ে যায় এবং অ্যাপ থেকে বেরিয়ে যেতে পারে। তাই **React Performance Optimization** খুবই গুরুত্বপূর্ণ। এখানে আমরা ধাপে ধাপে সবকিছু আলোচনা করবো, সাথে **কোড উদাহরণ** দিব।

---

## 1. কেন পারফরম্যান্স অপ্টিমাইজেশন দরকার?

- **ধীর লোড টাইম (Slow Loading):** যেমন একটি ই-কমার্স সাইটে ছবি, প্রোডাক্টের দাম বা শিরোনাম আসতে দেরি হলে ব্যবহারকারী চলে যায়।
- **অপ্রয়োজনীয় Re-render:** props বা state অল্প পরিবর্তন হলেও পুরো component tree রেন্ডার হয়।
- **ভারী গণনা (Expensive Computation):** বড় লিস্ট, জটিল লুপ, বা বড় ডেটা প্রসেস করলে ব্রাউজার স্লো হয়ে যায়।

👉 উদাহরণ:

```jsx
function ProductList({ products }) {
  return (
    <ul>
      {products.map(p => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}

```

যদি `products` লিস্টে হাজার হাজার আইটেম থাকে, পুরো DOM একসাথে রেন্ডার হবে, ফলে অ্যাপ খুব ধীর হয়ে যাবে।

---

## 2. Rendering অপ্টিমাইজেশন

### (ক) `React.memo()` ব্যবহার

একটি কম্পোনেন্ট একই props পেলে অপ্রয়োজনীয়ভাবে আবার রেন্ডার হওয়া এড়াতে `React.memo()` ব্যবহার করা হয়।

```jsx
const UserProfile = React.memo(function UserProfile({ name }) {
  console.log("Rendered:", name);
  return <h2>{name}</h2>;
});

```

➡️ এখন parent re-render হলেও `name` না বদলালে `UserProfile` আবার render হবে না।

---

### (খ) `useMemo()` ব্যবহার

ব্যয়বহুল ক্যালকুলেশন প্রতিবার না করে মেমোরাইজ করে রাখা হয়।

```jsx
function ExpensiveList({ items }) {
  const sortedItems = useMemo(() => {
    console.log("Sorting...");
    return items.sort((a, b) => a - b);
  }, [items]);

  return <ul>{sortedItems.map(i => <li key={i}>{i}</li>)}</ul>;
}

```

➡️ এখানে `items` না বদলালে sort আবার হবে না।

---

### (গ) Virtualization (Infinite Scroll)

বড় লিস্টের সব ডেটা একসাথে না দেখিয়ে আংশিক দেখানো।

👉 লাইব্রেরি: **react-window**, **react-virtualized**

```jsx
import { FixedSizeList as List } from "react-window";

function BigList({ items }) {
  return (
    <Listheight={300}
      itemCount={items.length}
      itemSize={35}
      width={300}
    >
      {({ index, style }) => <div style={style}>{items[index]}</div>}
    </List>
  );
}

```

➡️ এখানে একসাথে শুধু দৃশ্যমান আইটেমগুলো রেন্ডার হবে, হাজার হাজার হলেও অ্যাপ স্মুথ চলবে।

---

## 3. Effect অপ্টিমাইজেশন (`useEffect`)

### অপ্রয়োজনীয় Effect এড়ানো

অনেক সময় আমরা state এর ছোটখাটো পরিবর্তনে `useEffect` লিখে ফেলি, যা দরকার হয় না।

❌ খারাপ উদাহরণ:

```jsx
useEffect(() => {
  setFullName(firstName + " " + lastName);
}, [firstName, lastName]);

```

✅ ভালো উদাহরণ:

```jsx
const fullName = firstName + " " + lastName;

```

➡️ এখানে আলাদা effect দরকার নেই।

---

### State Reset করার উদাহরণ

ধরা যাক একটি প্রোফাইল পেজ আছে যেখানে `userId` পরিবর্তন হলে কমেন্ট ফিল্ড reset হওয়া দরকার।

```jsx
function Profile({ userId }) {
  const [comment, setComment] = useState("");

  useEffect(() => {
    setComment("");  // user পরিবর্তন হলে comment reset
  }, [userId]);

  return <input value={comment} onChange={e => setComment(e.target.value)} />;
}

```

---

## 4. লোডিং টাইম অপ্টিমাইজেশন

### (ক) ইমেজ অপ্টিমাইজেশন

- ছবি `lazy loading` করা
- JPG → WebP কনভার্ট করা
- কমপ্রেসড ছবি ব্যবহার করা

```html
<img src="product.webp" loading="lazy" alt="product" />

```

---

### (খ) Code Splitting (Dynamic Import)

পুরো অ্যাপ একবারে না লোড করে প্রয়োজন অনুযায়ী লোড করা।

```jsx
const LazyComponent = React.lazy(() => import("./BigComponent"));

function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </React.Suspense>
  );
}

```

---

### (গ) Production Build

Development build এর পরিবর্তে `npm run build` ব্যবহার করলে bundle ছোট হয়, performance ভালো হয়।

---

## 5. Performance Measurement Tools

### (ক) React Profiler

React DevTools দিয়ে কোন কম্পোনেন্ট কতবার render হচ্ছে তা দেখা যায়।

### (খ) Chrome Lighthouse

- **FCP (First Contentful Paint)** – প্রথম কনটেন্ট দেখাতে কত সময় লাগছে
- **TTI (Time to Interactive)** – অ্যাপ পুরোপুরি interactive হতে কত সময় লাগছে

### (গ) Network Throttling

Slow 3G/4G এ টেস্ট করে দেখা যায় অ্যাপ আসল ইউজারের কাছে কেমন পারফর্ম করছে।

---

## 6. Best Practices

- Unnecessary renders এড়িয়ে চলা
- State কে ছোট ছোট কম্পোনেন্টে ভাগ করা
- Keys সঠিকভাবে ব্যবহার করা (`key` ছাড়া list render না করা)
- Production build ব্যবহার করা
- Lazy loading + Code splitting ব্যবহার করা
- Large data এর ক্ষেত্রে Virtualization

---

## 7. উপসংহার

React Performance Optimization কোনও **একটি নির্দিষ্ট নিয়ম নয়**, বরং পরিস্থিতি অনুযায়ী **বিভিন্ন কৌশলের সমন্বয়**।

👉 মূল লক্ষ্য হলো:

1. **লোডিং দ্রুত করা**
2. **অপ্রয়োজনীয় রেন্ডার এড়ানো**
3. **ব্যবহারকারীর অভিজ্ঞতা মসৃণ করা**

---

✨ এক কথায়:

- ছোট অ্যাপের জন্য সাধারণ optimization (memo, lazy load) যথেষ্ট।
- বড় স্কেলের প্রোজেক্টে **virtualization, code splitting, profiling** অপরিহার্য।
