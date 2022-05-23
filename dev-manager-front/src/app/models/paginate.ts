export class Paginate {
    currentPage: number;
    itemCount: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;

    constructor(
        currentPage: number,
        itemCount: number,
        itemsPerPage: number,
        totalItems: number,
        totalPages: number,
    ) {
        this.currentPage = currentPage;
        this.itemCount = itemCount;
        this.itemsPerPage = itemsPerPage;
        this.totalItems = totalItems;
        this.totalPages = totalPages;
    }
}
