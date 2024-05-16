import { connect_to_db } from "$lib/server/db";
import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async () => {
    const connection = await connect_to_db();
    if (!connection) throw error(500, "Database connection failed");
};