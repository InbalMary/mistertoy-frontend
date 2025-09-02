import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next'

export function ToyPreview({ toy }) {
    const { t } = useTranslation()
    const createdAt = new Date(toy.createdAt).toLocaleDateString('he')
    return (
        <article>
            <h4>{toy.name}</h4>
            <img src={toy.imgUrl} alt="" />
            <p>{t('Price')}: <span>${toy.price.toLocaleString()}</span></p>
            <h5>{t('Created At')}: {createdAt}</h5>
            {toy.owner && <p>{t('Owner')}: <Link to={`/user/${toy.owner._id}`}>{toy.owner.fullname}</Link></p>}
            <hr />
            <Link to={`/toy/edit/${toy._id}`}>{t('Edit')}</Link> &nbsp; | &nbsp;
            <Link to={`/toy/${toy._id}`}>{t('Details')}</Link>
        </article>
    )
}