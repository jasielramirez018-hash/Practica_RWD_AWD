// Filtrar productos según el término de búsqueda, la categoría y el precio
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('#searchInput');
    const categoryFilter = document.querySelector('#category');
    const priceRange = document.querySelector('#priceRange');
    const priceValue = document.querySelector('#priceValue');
    const resultsCount = document.querySelector('#resultsCount');
    const emptyResults = document.querySelector('#emptyResults');
    const cardsGrid = document.querySelector('.cards-grid');

    if (searchInput && categoryFilter && priceRange && priceValue && resultsCount && emptyResults && cardsGrid) {
        const cards = Array.from(cardsGrid.querySelectorAll('.card[data-category][data-price]'));
        const normalizeText = (text) => text
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase('es');
        const formatPrice = (price) => `$${Number(price).toLocaleString('es-MX')}`;
        const filterDisclosure = document.querySelector('.sidebar-filters');
        const mobileViewport = window.matchMedia('(max-width: 639px)');

        function updateFilterDisclosure(event) {
            if (filterDisclosure) {
                filterDisclosure.open = !event.matches;
            }
        }

        updateFilterDisclosure(mobileViewport);
        mobileViewport.addEventListener('change', updateFilterDisclosure);

        function filterProducts() {
            const query = normalizeText(searchInput.value.trim());
            const category = categoryFilter.value;
            const maxPrice = Number(priceRange.value);
            let visibleCount = 0;

            const matchingCards = cards.map((card) => {
                const searchableText = normalizeText([
                    card.querySelector('h3').textContent,
                    ...Array.from(card.querySelectorAll('p'), (paragraph) => paragraph.textContent),
                    ...Array.from(card.querySelectorAll('.specs li'), (specification) => specification.textContent),
                    ...Array.from(card.querySelectorAll('img[alt]'), (image) => image.alt)
                ].join(' '));
                const isVisible = searchableText.includes(query)
                    && (category === 'all' || card.dataset.category === category)
                    && Number(card.dataset.price) <= maxPrice;

                card.hidden = !isVisible;
                if (isVisible) visibleCount += 1;

                return card;
            });

            matchingCards
                .sort((first, second) => {
                    const priceDifference = Number(second.dataset.price) - Number(first.dataset.price);
                    if (priceDifference !== 0) return priceDifference;
                    return cards.indexOf(first) - cards.indexOf(second);
                })
                .forEach((card) => cardsGrid.append(card));

            priceValue.value = formatPrice(maxPrice);
            resultsCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'producto encontrado' : 'productos encontrados'}`;
            emptyResults.hidden = visibleCount > 0;
        }

        searchInput.addEventListener('input', filterProducts);
        categoryFilter.addEventListener('change', filterProducts);
        priceRange.addEventListener('input', filterProducts);
        filterProducts();
    }
});