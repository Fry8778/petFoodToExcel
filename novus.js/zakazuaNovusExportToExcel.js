// Код передбачений для пошуку кормів для тварин на загальній сторінці  
function zakazuaNovusExportToExcel() {   
    const productCards = document.querySelectorAll('.ProductTile');
    console.log("productCards:", productCards);  
    const filteredProducts = Array.from(productCards).filter(productCard => {
        const productNameElement = productCard.querySelector('.ProductTile__title');          
        const productName = productNameElement ? productNameElement.innerText.toLowerCase() : ''; // Проверка существования элемента
            return  productName.includes("корм") ||           
                    productName.includes("корм консервований")  ||
                    productName.includes("корм вологий")  ||
                    productName.includes("вологий корм")  ||
                    productName.includes("корм для котів") ||
                    productName.includes("корм для кошенят") ||
                    productName.includes("корм для собак") ||
                    productName.includes("корм для цуценят") ||
                    productName.includes("корм консервований") ||
                    productName.includes("консерва") ||
                    productName.includes("консерви") ||
                    productName.includes("снеки") ||
                    productName.includes("снеки для собак") ||
                    productName.includes("палички") ||
                    productName.includes("паштет") ||                    
                    productName.includes("паштет м'ясний") ||
                    productName.includes("ласощі") ||                    
                    productName.includes("ласощі для котів") ||
                    productName.includes("ласощі для дорослих котів") ||
                    productName.includes("ласощі для кошенят") ||
                    productName.includes("ласощі для собак") ||
                    productName.includes("ласощі для цуценят") ||
                    productName.includes("легені яловичі") ||
                    productName.includes("печінка яловича") ||
                    productName.includes("корм сухий") ||
                    productName.includes("сухий корм") ||
                    productName.includes("сухий корм для собак") ||
                    productName.includes("м'ясний паштет") ||
                    productName.includes("mус basttet'o");
    });
    console.log("filteredProducts:", filteredProducts);

    const data = [[ 'Название товара',            
                    'Цена товара(текущая цена)', 
                    'Вес товара',     
                    'Цена товара с учетом скидки(текущая цена)',
                    'Старая цена товара(цена без скидки)',
                    'Процент скидки(%)']];

                    filteredProducts.forEach((productCard) => {
                        const productNameElements = productCard.querySelectorAll('.ProductTile__title'); 
                        const priceElement = productCard.querySelector('.jsx-12bf1bb778c37a8c > span.Price__value_caption');
                        const weightElement = productCard.querySelector('.ProductTile__weight');    
                
                        // Проверяем наличие скидки
                        const specialPriceElement = productCard.querySelector('.jsx-12bf1bb778c37a8c > span.Price__value_discount');  
                        const salePriceElement = productCard.querySelector('.ProductTile__oldPrice > span.Price__value_minor');     
                        const discountPercentageElement = productCard.querySelector('.Badge_straightLeft > span.Badge__text');
                
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

export { zakazuaNovusExportToExcel };