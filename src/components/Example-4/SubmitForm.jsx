import { useState } from "react";

// This is a placeholder function to simulate an API call.
const sendDataToAPI = (data) => {
  console.log("Submitting data:", data);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};

const SubmitForm = () => {
    const [data] = useState({
        id: '001',
        name: 'kamrul hasan',
        email: 'kamrul@gmail.com'
    });

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
        await sendDataToAPI(data); // সরাসরি API কল
        alert("Data submitted successfully!");
    };

    return (
        <form onSubmit={handleSubmit}>
            <p>This example demonstrates the correct way to handle data submission in a form.
                <br />
                Click the button to submit sample data.
            </p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <button type="submit">Submit Data</button>
        </form>
    );
};

export default SubmitForm;