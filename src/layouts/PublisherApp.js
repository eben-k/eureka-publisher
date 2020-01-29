import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import falcorModel from '../falcorModel';
import articleActions from '../actions/article';

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = (dispatch) => ({
  articleActions: bindActionCreators(articleActions, dispatch)
});

class PublisherApp extends Component {
  constructor(props) {
    super(props);
  }
  UNSAFE_componentWillMount() {
    if (typeof window !== 'undefined') {
      this._fetch();
    }
  }
  async _fetch() {
    const articlesLength = await falcorModel
      .getValue('articles.length')
      .then((length) => length);
    const articles = await falcorModel
      .get(['articles', { from: 0, to: articlesLength - 1 },
        ['id', 'articleTitle', 'articleContent']]).
      then((articlesResponse) => articlesResponse.json.articles);
    this.props.articleActions.articlesList(articles);
  }
  render() {
    console.log(this.props);
    let articleJSX = [];
    for (let articleKey in this.props.article) {

      const articleDetails = this.props.article[articleKey];
      const currentArticleJSX = (
        <div key={articleKey}>
          <h2>{articleDetails.articleTitle}</h2>
          <h3>{articleDetails.articleContent}</h3>
        </div>
      );
      articleJSX.push(currentArticleJSX);
    }
    return (
      <div>
        <h1>The Publisher App</h1>
        {articleJSX}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublisherApp);
