export default function reducer(state = [], action) {
    switch (action.type) {
        case "addTrendingMov":
            return [...state, action.payload];

        default:
            return state;
    }
}
