import AppConfig from "../app_config";

const db = AppConfig.getConfig().getDatabaseInstance();

export const findByChannelId = (channelId: string): Promise<any[]> => {
    return db('notif_channel')
        .where({ channel_id: channelId })
        .whereNull('deleted_at')
        ;
}

export const addChannel = async (channelId: string, addedBy: string): Promise<any> => {
    const now = new Date();

    return await db('notif_channel').insert({
        channel_id: channelId,
        added_by: addedBy,
        created_at: now.toISOString().split('T')[0]
    });
}

export const removeChannel = async (channelId: string, deletedBy: string): Promise<any> => {
    const now = new Date();

    return await db('notif_channel')
    .where('channel_id', channelId)
    .update({
        deleted_by: deletedBy,
        deleted_at: now.toISOString().split('T')[0]
    });
}