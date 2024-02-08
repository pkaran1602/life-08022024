export const changeToggle = (data) => {
    console.log(data)
    return {
        type: 'TOGGLE',
        data: data
    };
};