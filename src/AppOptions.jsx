import React from 'react';
import './AppOptions.css';
const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];

export default class AppOptions extends React.Component {
  handleButtonClick = item => {
    browser.storage.sync.set({color: item}).then(() => {
      console.log('color is ' + item);
    });
  }

  render() {
    return (
      <div className="Options">
        <div>选项效果，暂时无用</div>
        {
          kButtonColors.map(item => (
            <button
              key={item}
              style={{
                backgroundColor: item
              }}
              onClick={() => this.handleButtonClick(item)}
            />
          ))
        }
      </div>
    );
  }
}
