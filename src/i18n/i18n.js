import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            // ToyEdit
            "Add Toy": "Add Toy",
            "Edit Toy": "Edit Toy",
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
            "Loading...": "Loading..."
        }
    },
    he: {
        translation: {
            // ToyEdit
            "Add Toy": "הוסף צעצוע",
            "Edit Toy": "ערוך צעצוע",
            "Toy Name": "שם הצעצוע",
            "Price": "מחיר",
            "Image URL": "קישור תמונה",
            "In Stock": "במלאי",
            "Save": "שמור",
            "Cancel": "ביטול",
            "Online": "מחובר",
            "Disconnected": "מנותק",
            "Name is required": "שם הוא שדה חובה",
            "Price is required": "מחיר הוא שדה חובה",
            "Price must be at least 1": "המחיר חייב להיות לפחות 1",
            "Invalid URL": "כתובת לא תקינה",
            "Image URL is required": "קישור תמונה הוא שדה חובה",
            "Toy Saved!": "הצעצוע נשמר!",
            "Had issues in toy details": "הייתה בעיה בפרטי הצעצוע",
            "All": "הכל",
            "Yes": "כן",
            "No": "לא",

            // Validation messages
            "Name is required": "שם הוא שדה חובה",
            "Price must be at least 1": "המחיר חייב להיות לפחות 1",
            "Invalid URL": "כתובת לא תקינה",
            "Image URL is required": "קישור תמונה הוא שדה חובה",
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
            "Loading...": "טוען..."
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