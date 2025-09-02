import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
    const { i18n } = useTranslation();
    
    const handleLanguageChange = (event) => {
        const newLang = event.target.value
        i18n.changeLanguage(newLang)
        
        // Add RTL support for Hebrew
        document.dir = newLang === 'he' ? 'rtl' : 'ltr'
    }
    return (
        <select onChange={handleLanguageChange} value={i18n.language}>
            <option value="en">English US</option>
            <option value="he">IL עברית</option>
        </select>
    )
}