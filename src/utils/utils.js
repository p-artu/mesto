export function getAltByLink(title, link) {
  switch (link) {
    case 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg':
      return `Вершины ${title}а`
        break;
    case 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg':
      return `Река в Челябинской области`
        break;
    case 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg':
      return `Многоэтажки в ${title}`
        break;
    case 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg':
      return `Гора на Камчатке`
        break;
    case 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg':
      return `Железная дорога в Холмогорском районе`
        break;
    case 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg':
      return `Зимний, скалистый берег на озере ${title}`
        break;
    default:
      return `Ваша картинка ${title}`
  }
}
