class IdService {
    public static getUniqueId(length: number = 8): string {
        return Array.from(crypto.getRandomValues(new Uint8Array(length)))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("")
            .slice(0, length);
    }
}

export default IdService;
