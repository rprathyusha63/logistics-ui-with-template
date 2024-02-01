export class Warehouse {
    constructor(
    public warehouseId ?: number,
    public warehouseName?: string,
    public location?: String, 
    public warehouseManager?: String,
    public phone?: String,
    public email?: String,
    public warehouseStatus?: String,
    public warehouseOperatingHours?: String,
    public createdOn?:Date,
    public createdBy?: String){}
}
