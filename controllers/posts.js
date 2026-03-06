let posts = [
  { id: 1, name: 'post 1' },
  { id: 2, name: 'post 2' },
];

exports.getPosts = (req, res) => {
    res.json(posts)
}

exports.getPostsInfo = (req , res) => {
    const post = posts.find(p => p.id == req.params.id)

    if(!post) return res.status(404).send("post not Found")

    res.json(post)
}