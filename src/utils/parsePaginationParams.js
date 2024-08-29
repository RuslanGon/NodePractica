export const parsePaginationParams = (query) => {
    const page = parseInt(query.page, 10) || 1; //  значение страницы по умолчанию 1
    const perPage = parseInt(query.perPage, 10) || 10; //  количество элементов на странице по 10
    return { page, perPage };
  };
