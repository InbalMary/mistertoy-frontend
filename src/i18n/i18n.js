import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            // ToyEdit
            "Add Toy": "Add Toy",
            "Add": "Add",
            "Edit Toy": "Edit Toy",
            "Edit": "Edit",
            "Toy Name": "Toy Name",
            "Price": "Price",
            "Image URL": "Image URL",
            "In Stock": "In Stock",
            "Save": "Save",
            "Cancel": "Cancel",
            "Online": "Online",
            "Disconnected": "Disconnected",
            "Name is required": "Name is required",
            "Price is required": "Price is required",
            "Price must be at least 1": "Price must be at least 1",
            "Invalid URL": "Invalid URL",
            "Image URL is required": "Image URL is required",
            "Toy Saved!": "Toy Saved!",
            "Had issues in toy details": "Had issues in toy details",
            "All": "All",
            "Yes": "Yes",
            "No": "No",
            "loading": "Loading...",
            "Toys Filter..": "Toys Filter..",

            // Validation messages
            "Name is required": "Name is required",
            "Price must be at least 1": "Price must be at least 1",
            "Invalid URL": "Invalid URL",
            "Image URL is required": "Image URL is required",
            "Toy Saved!": "Toy Saved!",
            "Had issues in toy details": "Had issues in toy details",

            // AppHeader
            "React Toy App!": "React Toy App!",
            "Home": "Home",
            "About": "About",
            "Toys": "Toys",
            "Dashboard": "Dashboard",
            "Cart": "Cart",
            "Hello": "Hello",
            "Logout": "Logout",
            "logout successfully": "Logout successful",
            "OOPs try again": "Oops, try again",

            // ToyFilter
            "Toys Filter": "Toys Filter",
            "Search Toy Name..": "Search Toy Name..",
            "Enter Max Price..": "Enter Max Price..",
            "Sort by": "Sort by",
            "None": "None",
            "Name": "Name",
            "Created": "Created",

            // ToyPreview
            "Created At": "Created At",
            "Owner": "Owner",
            "Edit": "Edit",
            "Details": "Details",

            // ToyDetails
            "Toy": "Toy",
            "Labels": "Labels",
            "Our toys are crafted with the highest standards of safety and durability. Each product is carefully tested to ensure long-lasting fun for children of all ages. We take pride in offering toys that inspire creativity, learning, and joyful play.": "Our toys are crafted with the highest standards of safety and durability. Each product is carefully tested to ensure long-lasting fun for children of all ages. We take pride in offering toys that inspire creativity, learning, and joyful play.",
            "Chat": "Chat",
            "Welcome to Chat Support! 💁🏻‍♀️": "Welcome to Chat Support! 💁🏻‍♀️",
            "Close": "Close",
            "Back": "Back",
            "Previous Toy": "Previous Toy",
            "Next Toy": "Next Toy",
            "Loading...": "Loading...",

            // AppFooter
            "Currently": "Currently",
            "toys in the shop": "toys in the shop",
            "Coffeerights to all - 2025": "Coffeerights to all - 2025",
            "Products in your Cart": "Products in your Cart",
            "hide": "hide",
            "show": "show",
            "The Team": "The Team",
            "Our team is here": "Our team is here",
            "About us": "About us",
            "We are great": "We are great",
            "About you": "About you",
            "You are great": "You are great",
            "All Users": "All Users",
            "No users found": "No users found",
            "Failed to load users": "Failed to load users",

            //Login & Signup
            "Username": "Username",
            "Password": "Password",
            "Full name": "Full name",
            "Login": "Login",
            "Signup": "Signup",
            "New user? Signup here": "New user? Signup here",
            "Already a member? Login": "Already a member? Login",
            "Logged in successfully": "Logged in successfully",
            "Signed in successfully": "Signed in successfully",
            "Oops try again": "Oops try again",

            //Shopping Cart
            "Your Cart": "Your Cart",
            "Total": "Total",
            "Checkout": "Checkout",
            "Charged you": "Charged you",
            "There was a problem checking out!": "There was a problem checking out!",
            "Add to Cart": "Add to Cart",

            aboutUs: {
                title: "About Us",
                quality: "At our toy store, quality and safety always come first - every product is carefully tested and approved for all ages.",
                creativity: "We believe in sparking creativity and imagination with toys that are both fun and educational.",
                team: "Our team is passionate about bringing joy to children and peace of mind to parents through trusted, reliable products.",
            },
            branches: {
                telAviv: "Tel Aviv",
                haifa: "Haifa",
                jerusalem: "Jerusalem"
            },
            toyDashboard: {
                title: "Toys Dashboard",
                avgPrice: "Bar Chart - Average Toys Prices per Label",
                inStock: "Bar Chart - In Stock Percentage per Label",
                randomValues: "Line Chart - Random Values Over Time",
                totalToys: "Pie Chart - Total Toys per Label"
            },
            toyIndex: {
                title: "Toys App",
                addToy: "Add Toy",
                addRandom: "Add Random Toy 🧩"
            },
            user: {
                fullname: "Fullname",
                score: "Score",
                myStuff: "My Stuff!",
                description: "User is so lorem ipsum dolor sit amet, consectetur adipisicing elit...",
                loading: "Loading...",
                home: "Home"
            },
            chat: {
                you: "You",
                placeholder: "Type a message...",
                send: "Send 📩"
            },
        }
    },
    he: {
        translation: {
            // ToyEdit
            "Add Toy": "הוסף צעצוע",
            "Add": "הוסף",
            "Edit Toy": "ערוך צעצוע",
            "Edit": "ערוך",
            "Toy Name": "שם הצעצוע",
            "Price": "מחיר",
            "Image URL": "קישור לתמונה",
            "In Stock": "במלאי",
            "Save": "שמור",
            "Cancel": "ביטול",
            "Online": "מחובר",
            "Disconnected": "מנותק",
            "Name is required": "שדה שם הינו חובה",
            "Price is required": "שדה מחיר הינו חובה",
            "Price must be at least 1": "המחיר חייב להיות לפחות 1",
            "Invalid URL": "כתובת לא תקינה",
            "Image URL is required": "שדה קישור תמונה הינו חובה",
            "Toy Saved!": "הצעצוע נשמר!",
            "Had issues in toy details": "הייתה בעיה בפרטי הצעצוע",
            "All": "הכל",
            "Yes": "כן",
            "No": "לא",
            "loading": "טוען...",
            "Toys Filter..": "סינון צעצועים..",

            // Validation messages
            "Name is required": "שדה שם הינו חובה",
            "Price must be at least 1": "מחיר מינימלי הינו לכל הפחות 1",
            "Invalid URL": "כתובת לא תקינה",
            "Image URL is required": "שדה קישור תמונה הינו חובה",
            "Toy Saved!": "הצעצוע נשמר!",
            "Had issues in toy details": "הייתה בעיה בפרטי הצעצוע",

            // AppHeader
            "React Toy App!": "אפליקציית צעצועים!",
            "Home": "בית",
            "About": "אודות",
            "Toys": "צעצועים",
            "Dashboard": "לוח בקרה",
            "Cart": "עגלה",
            "Hello": "שלום",
            "Logout": "התנתק",
            "logout successfully": "התנתקת בהצלחה",
            "OOPs try again": "אופס, נסה שוב",

            // ToyFilter  
            "Toys Filter": "סינון צעצועים",
            "Search Toy Name..": "חפש שם צעצוע..",
            "Enter Max Price..": "הכנס מחיר מקסימלי..",
            "Sort by": "מיין לפי",
            "None": "ללא",
            "Name": "שם",
            "Created": "נוצר",

            // ToyPreview
            "Created At": "נוצר ב",
            "Owner": "בעלים",
            "Edit": "ערוך",
            "Details": "פרטים",

            // ToyDetails
            "Toy": "צעצוע",
            "Labels": "תוויות",
            "Our toys are crafted with the highest standards of safety and durability. Each product is carefully tested to ensure long-lasting fun for children of all ages. We take pride in offering toys that inspire creativity, learning, and joyful play.": "הצעצועים שלנו מיוצרים ברמת בטיחות ועמידות הגבוהה ביותר. כל מוצר נבדק בקפידה כדי להבטיח כיף לאורך זמן לילדים בכל הגילאים. אנו גאים להציע צעצועים שמעוררים יצירתיות, למידה ומשחק שמח.",
            "Chat": "צ'אט",
            "Welcome to Chat Support! 💁🏻‍♀️": "ברוכים הבאים לתמיכה! 💁🏻‍♀️",
            "Close": "סגור",
            "Back": "חזור",
            "Previous Toy": "צעצוע קודם",
            "Next Toy": "צעצוע הבא",
            "Loading...": "טוען...",

            // AppFooter  
            "Currently": "כרגע",
            "toys in the shop": "צעצועים בחנות",
            "Coffeerights to all - 2025": "כל הזכויות שמורות - 2025",
            "Products in your Cart": "מוצרים בעגלה שלך",
            "hide": "הסתר",
            "show": "הצג",
            "The Team": "הצוות",
            "Our team is here": "הצוות שלנו כאן",
            "About us": "עלינו",
            "We are great": "אנחנו מעולים",
            "About you": "עליך",
            "You are great": "אתה מעולה",
            "All Users": "כל המשתמשים",
            "No users found": "לא נמצאו משתמשים",
            "Failed to load users": "נכשל בטעינת המשתמשים",

            //Login & Signup
            "Username": "שם משתמש",
            "Password": "סיסמה",
            "Full name": "שם מלא",
            "Login": "התחבר",
            "Signup": "הירשם",
            "New user? Signup here": "משתמש חדש? הירשם כאן",
            "Already a member? Login": "כבר רשום? התחבר",
            "Logged in successfully": "התחברת בהצלחה",
            "Signed in successfully": "נרשמת בהצלחה",
            "Oops try again": "אופס, נסה שוב",

            //Shopping Cart
            "Your Cart": "העגלה שלך",
            "Total": "סך הכל",
            "Checkout": "לתשלום",
            "Charged you": "חויבת בסך",
            "There was a problem checking out!": "אירעה בעיה בתשלום!",
            "Add to Cart": "הוסף לעגלה",

            aboutUs: {
                title: "אודותינו",
                quality: "בחנות הצעצועים שלנו, איכות ובטיחות תמיד באות קודם – כל מוצר נבדק בקפידה ומאושר לכל הגילאים.",
                creativity: "אנחנו מאמינים בהציתת דמיון ויצירתיות עם צעצועים שהם גם מהנים וגם חינוכיים.",
                team: "הצוות שלנו מלא תשוקה להביא שמחה לילדים ושקט נפשי להורים באמצעות מוצרים אמינים ובטוחים.",
            },
            branches: {
                telAviv: "תל אביב",
                haifa: "חיפה",
                jerusalem: "ירושלים"
            },
            toyDashboard: {
                title: "דשבורד הצעצועים",
                avgPrice: "תרשים עמודות - ממוצע מחירי צעצועים לפי קטגוריה",
                inStock: "תרשים עמודות - אחוז במלאי לפי קטגוריה",
                randomValues: "תרשים קו - ערכים אקראיים לאורך זמן",
                totalToys: "תרשים עוגה - סך הצעצועים לפי קטגוריה"
            },
            toyIndex: {
                title: "אפליקציית צעצועים",
                addToy: "הוסף צעצוע",
                addRandom: "הוסף צעצוע אקראי 🧩"
            },
            user: {
                fullname: "שם מלא",
                score: "ניקוד",
                myStuff: "הדברים שלי!",
                description: "המשתמש הוא לורם איפסום דולור סיט אמט, קונסקטetur אדיפיסיקינג אליט...",
                loading: "טוען...",
                home: "בית"
            },
            chat: {
                you: "את/ה",
                placeholder: "הקלד הודעה...",
                send: "שלח 📩"
            },

        }
    }
}

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false
        }
    })

export default i18n