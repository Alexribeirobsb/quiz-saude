  // Inicializar carrinho
  useEffect(() => {
    const productParam = searchParams.get("product");
    const productsParam = searchParams.get("products");

    let productIds: string[] = [];
    if (productsParam) {
      productIds = productsParam.split(",");
    } else if (productParam) {
      productIds = [productParam];
    }

    const cartItems: CartItem[] = productIds
      .filter(id => productPrices[id])
      .map(id => ({
        id,
        name: productNames[id],
        price: productPrices[id],
        quantity: 1
      }));

    setCart(cartItems);
  }, [searchParams]);