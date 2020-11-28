export const CardRange = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
    'A'
 ];

 export const getTargetOrder = () => {
    return ['A', ...CardRange.slice(0, CardRange.length - 2)].reverse();
 }