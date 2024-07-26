// Код передбачений для пошуку кави на загальній сторінці  
function varusExportToExcel() {     
    const productCards = document.querySelectorAll('.sf-product-card__wrapper');
    const filteredProducts = Array.from(productCards).filter(productCard => {
        const productNameElement = productCard.querySelector('.sf-product-card__title');           
        const productName = productNameElement ? productNameElement.innerText.toLowerCase() : ''; // Проверка существования элемента
            return  productName.includes('корм') ||           
                    productName.includes('корм для котів')  ||
                    productName.includes('корм для кішок')  ||
                    productName.includes('корм для кошенят')  ||
                    productName.includes('корм для собак')  ||
                    productName.includes('корм для цуценят')  ||
                    productName.includes('корм для собак малих порід')  ||
                    productName.includes('сухий корм') ||
                    productName.includes('сухий повнораціонний корм') ||
                    productName.includes("сухий повнораціонний корм для кошенят")  ||
                    productName.includes("вологий корм")  ||
                    productName.includes("корм вологий")  ||
                    productName.includes('консерва для котів') ||
                    productName.includes('консерва для кішок') ||
                    productName.includes('консерви') ||                    
                    productName.includes('паштет') ||
                    productName.includes('корм вологий') ||
                    productName.includes('корм для стерилізованих котів'); 
    });

    const data = [[ 'Название товара',            
                    'Цена товара(текущая цена)', 
                    'Вес товара',     
                    'Цена товара с учетом скидки(текущая цена)',
                    'Старая цена товара(цена без скидки)',
                    'Процент скидки(%)']];

    filteredProducts.forEach((productCard) => {
        const productNameElements = productCard.querySelectorAll('.sf-product-card__title'); 
        const priceElement = productCard.querySelector('.sf-price .sf-price__regular');
        const weightElement = productCard.querySelector('.sf-product-card__quantity');
        
        // Проверяем наличие скидки
        const specialPriceElement = productCard.querySelector('.sf-price .sf-price__special');       
        const salePriceElement = productCard.querySelector('.sf-price .sf-price__old');
        const discountPercentageElement = productCard.querySelector('.sf-product-card__badge_text');    

        console.log("productNameElements:", productNameElements);        
        console.log("priceElement:", priceElement);
        console.log("weightElement:", weightElement);
        
        console.log("specialPriceElement:", specialPriceElement);        
        console.log("salePriceElement:", salePriceElement); 
        console.log("discountPercentageElement:", discountPercentageElement);

        if (!specialPriceElement || !salePriceElement || !discountPercentageElement) {
            // Если элементов нет внутри, значит, товар не имеет скидки
            const price = priceElement ? priceElement.innerText.trim() || '' : '';  
            const weight = weightElement ? weightElement.innerText.trim() || '' : '';  
            const productName = Array
            .from(productNameElements)
            .map(element => element.innerText.trim() || '')
            .join(' ');     
            const specialPrice = '';  // Пустое значение для товаров без скидки
            const salePrice = '';     // Пустое значение для товаров без скидки
            const discountPercentage = '';     // Пустое значение для товаров без скидки
            data.push([ productName,    
                        price,
                        weight,
                        specialPrice,                     
                        salePrice,
                        discountPercentage]);
        } else {
            // Если элементы найдены, значит, товар имеет скидку
            const productName = Array
                .from(productNameElements)
                .map(element => element.innerText.trim() || '')
                .join(' ');
                // Если товар имеет скидку, то при формировании массива данных оставляем ячейку с 'Цена товара(текущая цена)' пустой
            const price = '';  
            const weight = weightElement ? weightElement.innerText.trim() || '' : '';  
            const specialPrice = specialPriceElement ? specialPriceElement.innerText.trim() || '' : '';               
            const salePrice = salePriceElement ? salePriceElement.innerText.trim() || '' : '';             
            const discountPercentage = discountPercentageElement ? discountPercentageElement.innerText.trim() || '' : '';  
            data.push([ productName,    
                        price,
                        weight,
                        specialPrice,                     
                        salePrice,
                        discountPercentage]);
        }
    });

    if (data.length <= 1) {
        alert("На странице нет данных для экспорта в Excel.");
        return;
    }

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "data.xlsx");
}

export { varusExportToExcel };