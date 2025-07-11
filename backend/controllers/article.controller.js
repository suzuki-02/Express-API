import Article from '../models/article.model.js';

export const getArticles = (req, res) => {
  Article.find()
    .then((articles) => {
      res.status(200).json({
        success: true,
        message: 'Articles fetched successfully',
        data: articles,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: 'Error fetching articles',
        error: error.message,
      });
    });
};

export const addArticle = (req, res) => {
  const { title, description, content, tags, userId } = req.body;
  // const userId = req.user._id;
  const newArticle = new Article({
    title,
    description,
    content,
    userId,
    tags: tags || [],
  });
  newArticle.save()
    .then((article) => {
      res.status(201).json({
        success: true,
        message: 'Article created successfully',
        data: article,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: 'Error creating article',
        error: error.message,
      });
    });
};

export const getArticleById = (req, res) => {
  const { id } = req.params;
  Article.findById(id)
    .then((article) => {
      if (!article) {
        return res.status(404).json({
          success: false,
          message: 'Article not found',
        });
      }
      res.status(200).json({
        success: true,
        message: 'Article fetched successfully',
        data: article,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: 'Error fetching article',
        error: error.message,
      });
    });
}

export const updateArticle = (req, res) => {
  const { id } = req.params;
  const { title, description, content, tags, isPublished } = req.body;

  Article.findByIdAndUpdate(id, { title, description, content, tags, isPublished }, { new: true })
    .then((article) => {
      if (!article) {
        return res.status(404).json({
          success: false,
          message: 'Article not found',
        });
      }
      res.status(200).json({
        success: true,
        message: 'Article updated successfully',
        data: article,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: 'Error updating article',
        error: error.message,
      });
    });
}

export const deleteArticle = (req, res) => {
  const { id } = req.params;

  Article.findByIdAndDelete(id)
    .then((article) => {
      if (!article) {
        return res.status(404).json({
          success: false,
          message: 'Article not found',
        });
      }
      res.status(200).json({
        success: true,
        message: 'Article deleted successfully',
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: 'Error deleting article',
        error: error.message,
      });
    });
};