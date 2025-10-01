export interface IItem {
    id: number;
    room_id: number;
    name: string;
    quantity: string;
    category: string;
    is_purchased: boolean;
    purchased_at: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}
