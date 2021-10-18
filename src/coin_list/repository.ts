import AppConfig from "../app_config";

const db = AppConfig.getConfig().getDatabaseInstance();

export const THRESHOLD_TYPE_UNDER = 1;
export const THRESHOLD_TYPE_UPPER = 2;

export const getAllCoin = (): Promise<any[]> => {
    return db('coin_list').whereNull('deleted_at');
}

export const findByCoin = (coin: string): Promise<any[]> => {
    return db('coin_list')
        .where({ coin_code: coin })
        .whereNull('deleted_at')
        ;
}

export const addCoin = async (coin: string, thresholdType: number, price: number, addedBy: string): Promise<any> => {
    const now = new Date();

    return await db('coin_list').insert({
        coin_code: coin,
        threshold_type: thresholdType,
        price: price,
        added_by: addedBy,
        created_at: now.toISOString().split('T')[0]
    });
}


export const updateCoin = async (coin: string, thresholdType: number, price: number, updatedBy: string): Promise<any> => {
    const now = new Date();
    
    return await db('coin_list')
    .where('coin_code', coin)
    .update({
        threshold_type: thresholdType,
        price: price,
        updated_by: updatedBy
    });
}

export const removeCoin = async (coin: string, deletedBy: string): Promise<any> => {
    const now = new Date();

    return await db('coin_list')
    .where('coin_code', coin)
    .update({
        deleted_by: deletedBy,
        deleted_at: now.toISOString().split('T')[0]
    });
}