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


# রিঅ্যাক্ট অ্যাপ্লিকেশন পারফরম্যান্স অপটিমাইজেশন:

এই বিস্তারিত আলোচনাটি **রিঅ্যাক্ট অ্যাপ্লিকেশনকে মসৃণ ও দ্রুত** করার জন্য প্রয়োজনীয় **উন্নত হুকস, কৌশল এবং বাস্তব কোড প্রয়োগের** উপর জোর দেয়। মূল ফোকাস হলো **অপ্রয়োজনীয় রেন্ডারিং এবং UI-কে ব্লক করা ব্যয়বহুল অপারেশন** এড়িয়ে ব্যবহারকারীর অভিজ্ঞতা (UX) সর্বোচ্চ স্তরে নিয়ে যাওয়া।

## ১. ব্যয়বহুল গণনার অপটিমাইজেশন: `useMemo` এর কার্যকরী ব্যবহার

জটিল লজিক বা গণনার কারণে যখন UI ব্লক হয়ে যায়, তখন সেই **ব্যয়বহুল গণনাগুলিকে মেমোরাইজ (Memorize)** করার জন্য `useMemo` ব্যবহার করা হয়। এটি নিশ্চিত করে যে একটি গণনা শুধুমাত্র তার নির্ভরশীলতা পরিবর্তিত হলেই ঘটবে, অন্যথায় ক্যাশড ফলাফলটি ব্যবহার করা হবে।

### ক. `useMemo` ব্যবহার করে UI ব্লক করা গণনা দূরীকরণ

একটি উদাহরণে দেখানো হয়েছিল যে একটি দীর্ঘ সিঙ্ক্রোনাস লুপ কীভাবে মূল থ্রেডকে ব্লক করে। `useMemo` ব্যবহার করে এই সমস্যা সমাধান করা যায়:

JavaScript

```jsx
import React, { useState, useMemo } from 'react';

// একটি সিমুলেটেড, সময়সাপেক্ষ গণনা ফাংশন
const calculateExpensiveValue = (n) => {
    console.time("Expensive Calculation");
    let result = 0;
    for (let i = 0; i < n; i++) {
        result += i;
    }
    console.timeEnd("Expensive Calculation");
    return result;
};

const CalculatorComponent = () => {
    const [counter, setCounter] = useState(0);
    const N = 900000000; // বড় সংখ্যা

    // useMemo ব্যবহার করে গণনা মেমোরাইজ করা
    const finalValue = useMemo(() => {
        // এই ব্লকটি শুধুমাত্র কম্পোনেন্ট মাউন্ট হওয়ার সময় একবারই চলবে
        // কারণ N ফিক্সড এবং ডিপেন্ডেন্সি অ্যারেতে শুধু N আছে
        return calculateExpensiveValue(N);
    }, [N]); 

    return (
        <div>
            <h1>Counter: {counter}</h1>
            <button onClick={() => setCounter(c => c + 1)}>
                Increment Counter
            </button>
            <p>Calculated Value: {finalValue}</p>
            {/*
                Counter-এ ক্লিক করলেও Expensive Calculation আর চলবে না, 
                ফলে UI মসৃণ থাকবে।
            */}
        </div>
    );
};
```

---

## ২. চাইল্ড রেন্ডারিং নিয়ন্ত্রণ: `useCallback` এবং `React.memo`

প্যারেন্ট কম্পোনেন্ট রি-রেন্ডার করলে চাইল্ড কম্পোনেন্টগুলিতে অপ্রয়োজনীয় রি-রেন্ডারিং এড়াতে এই দুটি কৌশল একত্রে ব্যবহৃত হয়।

### ক. `useCallback` ব্যবহার করে ফাংশন রেফারেন্স স্থিতিশীল রাখা

চাইল্ড কম্পোনেন্টে প্রপস হিসাবে পাস করা ফাংশনগুলির রেফারেন্স স্থিতিশীল রাখতে `useCallback` ব্যবহৃত হয়।

JavaScript

```jsx
import React, { useState, useCallback } from 'react';

// চাইল্ড কম্পোনেন্ট: যা শুধুমাত্র তখনই রি-রেন্ডার করবে যখন এর প্রপস পরিবর্তিত হবে
const ItemList = React.memo(({ items, onDeleteItem }) => {
    console.log("ItemList Re-rendered"); // অপ্রয়োজনীয় রি-রেন্ডার চিহ্নিত করার জন্য
    return (
        <ul>
            {items.map(item => (
                <li key={item.id}>
                    {item.name} 
                    <button onClick={() => onDeleteItem(item.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
});

const ParentComponent = () => {
    const [items, setItems] = useState([{ id: 1, name: 'Item 1' }]);
    const [inputValue, setInputValue] = useState('');

    // useCallback ব্যবহার করে onDeleteItem ফাংশনের রেফারেন্স স্থিতিশীল রাখা
    const handleDeleteItem = useCallback((id) => {
        setItems(currentItems => currentItems.filter(item => item.id !== id));
    }, []); // যেহেতু setItems একটি স্থিতিশীল ফাংশন, নির্ভরতা খালি রাখা যেতে পারে

    // inputValue স্টেট পরিবর্তন হলেও ItemList অপ্রয়োজনীয়ভাবে রি-রেন্ডার করবে না,
    // কারণ onDeleteItem এর রেফারেন্স পরিবর্তন হয়নি।
    return (
        <div>
            <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Type here..." />
            <ItemList items={items} onDeleteItem={handleDeleteItem} />
        </div>
    );
};
```

---

## ৩. স্টেটের ধারাবাহিকতা ও রিসেট: `key` অ্যাট্রিবিউটের কৌশলগত ব্যবহার

যখন কম্পোনেন্টের ভেতরের স্টেট রিসেট করার প্রয়োজন হয় (যেমন, প্রোফাইল পরিবর্তনের সময় মন্তব্যের স্টেট), তখন **`key` অ্যাট্রিবিউট** ব্যবহার করা হয়। `key` পরিবর্তন করলে রিঅ্যাক্ট কম্পোনেন্টটিকে **সম্পূর্ণভাবে নতুন** হিসেবে মাউন্ট (Mount) করে।

### ক. `key` ব্যবহার করে চাইল্ড স্টেট রিসেট

JavaScript

```jsx
import React, { useState } from 'react';

// এই কম্পোনেন্টে একটি অভ্যন্তরীণ স্টেট আছে যা রিসেট করা দরকার
const ProfileDetails = ({ userId }) => {
    const [commentText, setCommentText] = useState('');
    
    // যখন অন্য ইউজারের প্রোফাইল লোড হয়, তখন এই ইনপুটটি পরিষ্কার হওয়া উচিত
    return (
        <div>
            <h2>User Profile: {userId}</h2>
            <input 
                value={commentText} 
                onChange={(e) => setCommentText(e.target.value)} 
                placeholder={`Write comment for user ${userId}`} 
            />
            {/* অন্যান্য প্রোফাইল বিবরণ */}
        </div>
    );
};

const ProfileSwitcher = () => {
    const [currentUserId, setCurrentUserId] = useState(101);

    return (
        <div>
            <button onClick={() => setCurrentUserId(101)}>Load User 101</button>
            <button onClick={() => setCurrentUserId(202)}>Load User 202</button>
            
            {/* key={currentUserId} ব্যবহারের ফলে:
              যখন currentUserId পরিবর্তন হয় (101 -> 202), React ProfileDetails-কে 
              সম্পূর্ণ unmount করে নতুন করে মাউন্ট করে, ফলে commentText স্টেট রিসেট হয়ে যায়।
            */}
            <ProfileDetails key={currentUserId} userId={currentUserId} />
        </div>
    );
};
```

---

## ৪. `useEffect` এর সঠিক ব্যবহার: অপ্রয়োজনীয় ইফেক্ট পরিহার

অপ্রয়োজনীয় `useEffect` ব্যবহার করলে অতিরিক্ত রেন্ডারিং এবং জটিলতা বাড়ে। **বাহ্যিক সিস্টেমের সাথে সিঙ্ক্রোনাইজেশনের** জন্যই কেবল `useEffect` ব্যবহার করা উচিত।

### ক. রেন্ডারিং-এর সময় গণনা (Effect-মুক্ত গণনা)

স্টেট বা প্রপসের ভিত্তিতে অন্য একটি ভ্যালু গণনা করার জন্য `useEffect`-এর প্রয়োজন নেই, সরাসরি রেন্ডারিং-এর সময় গণনা করাই দক্ষ উপায়:

JavaScript

```jsx
const UserProfile = ({ firstName, lastName }) => {
    
    // ❌ অপ্রয়োজনীয় Effect ব্যবহার: এটি দ্বিগুণ রেন্ডার সৃষ্টি করে
    /*
    const [fullName, setFullName] = useState('');
    useEffect(() => {
        setFullName(`${firstName} ${lastName}`);
    }, [firstName, lastName]);
    */

    // ✅ সঠিক এবং দক্ষ পদ্ধতি: সরাসরি রেন্ডারিং-এর সময় গণনা
    const fullName = `${firstName} ${lastName}`; 

    return <h1>Welcome, {fullName}</h1>;
};
```

### খ. ব্যবহারকারী ইভেন্ট হ্যান্ডেলিং (Effect-মুক্ত API কল)

ব্যবহারকারীর ইভেন্টের প্রতিক্রিয়ায় কোনো কাজ (যেমন API কল, অ্যানালিটিক্স পাঠানো) করার জন্য `useEffect` ব্যবহার করা উচিত নয়।

JavaScript

```jsx
const SubmitForm = () => {
    const [data, setData] = useState(null);

    // ❌ ভুল: submit-এর পর একটি state পরিবর্তন করে, যা effect-কে ট্রিগার করে
    /*
    useEffect(() => {
        if (data) {
            sendDataToAPI(data); // API কল 
        }
    }, [data]);
    */

    // ✅ সঠিক: সরাসরি ইভেন্ট হ্যান্ডেলারে API কল
    const handleSubmit = async (e) => {
        e.preventDefault();
        // ফর্ম ডেটা তৈরি করা হলো...
        await sendDataToAPI(formData); // সরাসরি API কল
        alert("Data submitted successfully!");
    };

    return <form onSubmit={handleSubmit}>...</form>;
};
```

---

## ৫. অ্যাডভান্সড লোডিং কৌশল: `React.lazy` এবং `Suspense`

অ্যাপ্লিকেশনটির প্রাথমিক লোডিং গতি বাড়াতে এবং বান্ডেলের আকার কমাতে **কোড স্প্লিটিং (Code Splitting)** ব্যবহার করা হয়।

### ক. লেজি লোডিং প্রয়োগ

JavaScript

```jsx
import React, { Suspense, lazy } from 'react';

// একটি ভারী বা খুব কম ব্যবহৃত কম্পোনেন্টকে লেজি লোড করা
const HeavyImageEditor = lazy(() => import('./HeavyImageEditor')); 

const Dashboard = () => {
    const [showEditor, setShowEditor] = useState(false);

    return (
        <div>
            <h1>Main Dashboard Content</h1>
            <button onClick={() => setShowEditor(true)}>Open Image Editor</button>
            
            {showEditor && (
                // Suspense কম্পোনেন্ট লোড না হওয়া পর্যন্ত fallback UI দেখায়
                <Suspense fallback={<div>Loading Image Editor...</div>}>
                    <HeavyImageEditor /> 
                </Suspense>
            )}
            {/*
                HeavyImageEditor-এর কোডটি শুধুমাত্র যখন এটি প্রথমবার রেন্ডার হবে (showEditor=true)
                তখনই ডাউনলোড হবে, যা অ্যাপ্লিকেশনের প্রাথমিক লোডিং সময় কমায়।
            */}
        </div>
    );
};
```