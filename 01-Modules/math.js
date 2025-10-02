// 1. Named exports
exports.add = function add(a, b)
{
    return a + b;
}

exports.sub = function sub(a, b)
{
    return a - b;
}

exports.mul = function mul(a, b)
{
    return a * b;
}

exports.div = function div(a, b)
{
    return a / b;
}

// 2. Default Exports
module.exports = function()
{
    console.log('Hey, I am default');
}