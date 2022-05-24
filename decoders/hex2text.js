function hexToText(s) {
    OUTPUT.style.color = 'var(--yellow-6)'
    let result = decodeURIComponent(s.replace(/\s+/g, '').replace(/[0-9a-fA-F]{2}/g, '%$&'))
    return ( result !='')?result: 'No results'
}