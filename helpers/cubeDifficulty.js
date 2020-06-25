const getDifficultyString = (number) => {

    switch (number) {
        case 1:
            return `<option value="1" selected="selected">1 - Very Easy</option>`;
        case 2:
            return `<option value="2" selected="selected">2 - Easy</option>`;
        case 3:
            return `<option value="3" selected="selected">3 - Medium (Standard 3x3)</option>`;
        case 4:
            return `<option value="4" selected="selected">4 - Intermediate</option>`;
        case 5:
            return `<option value="5" selected="selected">5 - Expert</option>`;
        case 6:
            return `<option value="6" selected="selected">6 - Hardcore</option>`;
        default:
            break;
    }
}

module.exports = { getDifficultyString };