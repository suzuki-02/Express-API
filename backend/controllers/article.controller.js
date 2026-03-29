import Article from '../models/article.model.js';

export const getArticles = async (req, res, next) => {
  try {
    const toInt = (value, fallback) => {
      const n = parseInt(value, 10);
      return Number.isFinite(n) ? n : fallback;
    };

    let page = Math.max(toInt(req.query.page, 1), 1);
    const limit = Math.min(Math.max(toInt(req.query.limit, 10), 1), 50);

    const q = String(req.query.q ?? '').trim();
    const publishedOnly = String(req.query.publishedOnly ?? 'false') === 'true';

    // Build filter
    const filter = {};
    if (publishedOnly) filter.isPublished = true;

    if (q) {
      filter.$text = { $search: q };
    }

    // Count first -> clamp page properly
    const totalItems = await Article.countDocuments(filter);
    const totalPages = Math.max(Math.ceil(totalItems / limit), 1);
    page = Math.min(page, totalPages);

    const skip = (page - 1) * limit;

    // Sorting: if searching, prioritize relevance
    const sort = q
      ? { score: { $meta: 'textScore' }, createdAt: -1 }
      : { createdAt: -1 };

    const query = Article.find(filter).sort(sort).skip(skip).limit(limit);

    // Include score only when searching (optional)
    if (q) query.select({ score: { $meta: 'textScore' } });

    const articles = await query.lean();

    return res.status(200).json({
      success: true,
      message: 'Articles fetched successfully',
      data: articles,
      meta: {
        page,
        limit,
        totalItems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        q: q || undefined,
        publishedOnly,
      },
    });
  } catch (err) {
    next(err);
  }
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
  newArticle
    .save()
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
};

export const updateArticle = (req, res) => {
  const { id } = req.params;
  const { title, description, content, tags, isPublished } = req.body;

  Article.findByIdAndUpdate(
    id,
    { title, description, content, tags, isPublished },
    { new: true },
  )
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
};

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
