export const cutString = (str: string, takeFirst: number, takeLast: number) => {
    if (!str || str.length <= takeFirst + takeLast) {
        return str;
    }

    return (
        str.substring(0, takeFirst) +
        '...' +
        str.substring(str.length - takeLast, str.length)
    );
};
