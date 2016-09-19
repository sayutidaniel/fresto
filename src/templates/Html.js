import React from 'react';

class Html extends React.Component {
  static get propTypes() {
    return {
      scripts: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
      styles: React.PropTypes.arrayOf(React.PropTypes.string),
      title: React.PropTypes.string.isRequired,
    };
  }

  render() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700" rel="stylesheet" />
          {this.props.styles && this.props.styles.map((style, index) => <link key={index} type="text/css" rel="stylesheet" href={style} />)}
        </head>
        <body>
          <div id="app">
            {this.props.children}
          </div>
          {this.props.scripts && this.props.scripts.map((script, index) => <script key={index} type="text/javascript" src={script} />)}
        </body>
      </html>
    );
  }
}

export default Html;
