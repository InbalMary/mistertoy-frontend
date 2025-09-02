import { GoogleMap } from "../cmps/GoogleMap";
import { useTranslation } from 'react-i18next'

export function AboutUs() {
    const { t } = useTranslation()
    const branches = [
        { name: t('branches.telAviv'), lat: 32.0853, lng: 34.7818 },
        { name: t('branches.haifa'), lat: 32.7940, lng: 34.9896 },
        { name: t('branches.jerusalem'), lat: 31.7683, lng: 35.2137 }
    ]

    return (
        <section>
            <h2>{t('aboutUs.title')}</h2>
            <p>{t('aboutUs.quality')}</p>
            <p>{t('aboutUs.creativity')}</p>
            <p>{t('aboutUs.team')}</p>

            <GoogleMap branches={branches} />
        </section>
    )
}
