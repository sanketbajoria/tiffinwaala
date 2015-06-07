var venders = [
    {id: 0, title: "Vegsutra Hospitality Pvt Ltd", name: "Christophe Coenraets", twitter_id: "@ccoenraets", description: "description",tel:'+(91)-22-38559670'},
    {id: 1, title: "Zayka Tiffin Service", name: "Holly Schinsky", twitter_id: "@devgirlfl", description: "description",tel:'+(91)-22-38559670'},
    {id: 2, title: "Sabka Tiffin", name: "Michael Brooks", twitter_id: "@mwbrooks", description: "description",tel:'+(91)-22-38559670'},
    {id: 3, title: "Satva Foods", name: "Brett Rudd", twitter_id: "@brettrudd", description: "description",tel:'+(91)-22-38559670'},
    {id: 4, title: "KGN Caterers", name: "Joe Bowser", twitter_id: "@infil00p", description: "description",tel:'+(91)-22-38559670'},
    {id: 5, title: "Dipaanjali Tiffin Service", name: "Brian Leroux", twitter_id: "@brianleroux", description: "description",tel:'+(91)-22-38559670'},
    {id: 6, title: "Ganapatti Thali", name: "Holly Schinsky", twitter_id: "@devgirlfl", description: "description",tel:'+(91)-22-38559670'},
    {id: 7, title: "DRS Kitchen", name: "Michael Brooks", twitter_id: "@mwbrooks", description: "description",tel:'+(91)-22-38559670'},
    {id: 8, title: "Food Connect ", name: "Christophe Coenraets", twitter_id: "@ccoenraets", description: "description",tel:'+(91)-22-38559670'},
    {id: 9, title: "Mauli Tiffin Service", name: "Jason Weathersby", twitter_id: "@jasonweathersby", description: "description",tel:'+(91)-22-38559670'},
];

exports.findAll = function (req, res, next) {
    res.send(venders);
};

exports.findById = function (req, res, next) {
    var id = req.params.id;
    res.send(venders[id]);
};