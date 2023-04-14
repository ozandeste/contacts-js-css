const TAB_ELEMENTS = Array.from(
  document.querySelectorAll('.contacts-app__tabs-tab')
);
const TABS = { favorites: 0, all: 1 }; // favorites and all tabs
const contactList = document.getElementById('contact-list');




export class UI {
  static loadContacts(contacts) {
    contacts.map((c) => {
      const contact = `
      <div class="d-flex align-center pb-3 pt-3 contacts-app__list-item gap-3" data-fullname="${c.name.first + ' ' + c.name.last}">
        <div class="contacts-app__list-item-image" style="flex: 1">
          <img class="responsive-img rounded" src="${c.picture.thumbnail}" alt="${c.name.first + ' ' + c.name.last}'s image">
        </div>
        <div class="contacts-app__list-item-info f-col" style="flex: 5">
          <div class="contacts-app__list-item-info_name"><h4>${c.name.first + ' ' + c.name.last}</h4></div>
          <div class="contacts-app__list-item-info_city text-secondary"><p class="sub-heading">${c.location.state}, ${c.location.country}</p></div>
        </div>
        <div class="contacts-app__list-item-info-action" style="flex: 1;">
          <div class="add-to-favorite" style="cursor: pointer; padding: 5px 10px;">
            <i data-feather="heart" style="width: 24px; height: 24px;"></i>
          </div>
        </div>
      </div>
      `
      
      contactList.innerHTML += contact;
    })
  }

  static toggleFavorite(e) {
    const contactItem = e.target.parentElement.parentElement.parentElement;

    if(contactItem.hasAttribute('data-isFavorite')) contactItem.removeAttribute('data-isFavorite');
    else contactItem.setAttribute('data-isFavorite', '1')

    e.preventDefault();
  }

  static toggleSearchBox() {
    const inputContainer = document.querySelector('.contacts-app__search-box');

    inputContainer.classList.toggle('active')
  }

  static responsiveList() {
    const height = contactList.parentElement.parentElement.clientHeight - contactList.parentElement.clientHeight;
    
    contactList.style.setProperty('height', `${height}px`);
  }

  static loadSelectedTabs() {
    TAB_ELEMENTS.map(
      (tab) =>
        tab.getAttribute('data-active') == '1' &&
        !tab.classList.contains('contacts-app__tabs-tab--active') &&
        tab.classList.add('contacts-app__tabs-tab--active')
    );
  }

  static loadScreen(screen) {
    if(screen === "favorites") {
      this.filterFavorites()
    }
    else if(screen === "all") {
      this.filterAll()
    }
  }

  static filterFavorites() {
    const contact_elements = Array.from(document.querySelectorAll('.contacts-app__list-item'));

    contact_elements.map((element) => {
      if(!element.hasAttribute('data-isFavorite')) {

        this.resetAllClasses(element)

        this.removeElement(element)
      };
    })
  }

  static filterAll() {
    const contact_elements = Array.from(document.querySelectorAll('.contacts-app__list-item'));

    contact_elements.map((element) => {
      if(!element.hasAttribute('data-isFavorite')) {
        this.loadElement(element)
      }
    })
  }

  static removeElement(element) {
    element.classList.add('remove-item');
  }

  static loadElement(element) {
    element.classList.add('item-loading');
  }

  static resetAllClasses(element) {
    element.classList.remove('item-loading');
    element.classList.remove('remove-item');
  }
}