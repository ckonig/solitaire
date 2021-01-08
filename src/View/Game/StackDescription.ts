const getStackLabel = (source: string) => {
    const names = [0, 1, 2, 3, 4, 5, 6].map((id) => " stack " + (id + 1));
    let label = "";
    const split = source.split("-");
    label += split[0];
    if (split.length > 1) {
        label += names[parseInt(split[1])];
    }
    return label;
};

export default getStackLabel;
