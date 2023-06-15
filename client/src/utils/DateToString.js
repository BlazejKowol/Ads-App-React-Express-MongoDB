const dateToString = date => {
    const dateObject = { day: 'numeric', month: 'numeric', year: 'numeric' };

    return new Date(date).toLocaleDateString("en-US", dateObject);
}

export default dateToString;