import React from 'react';
import './AppPopup.css';

export default class AppPopup extends React.Component {
  constructor (props) {
    super(props);

  }

  componentDidMount () {
    // // 列表页
    // const url1 = 'http://mooc1.chaoxing.com/mycourse/studentcourse?courseId=205009199&clazzid=10169240&ut=s&enc=5994cf3f6886ebb716cdb79f570b66fb'
    // // 播放页
    // const url2 = 'http://mooc1.chaoxing.com/mycourse/studentstudy?chapterId=168087103&courseId=205009199&clazzid=10169240&enc=5994cf3f6886ebb716cdb79f570b66fb'
    const reg = new RegExp(/(?=studentcourse)/)

    browser.tabs.onUpdated.addListener((id, info, tab) => {
      if (info.status === "complete" && id === this.tabId) {
        console.log(id, info, tab.url,);
        if (reg.test(tab.url)) {
          this.handleButtonClick();
        } else {
          this.handleShow();
        }
      }
    });

  }

  handleButtonClick = async () => {
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true
    });

    browser.storage.sync.set({tabId: tabs[0].id}).then(() => {
      this.tabId = tabs[0].id;
      console.log('The tab is ', tabs[0].id);
    });

    browser.tabs.sendMessage(
      tabs[0].id,
      {
        type: 3,
        tabId: tabs[0].id,
      }
    ).then(response => {


    }).catch((error) => {

    });
  }

  handleShow = async () => {
    const tabs = await browser.tabs.query(
      {
        active: true,
        currentWindow: true
      });
    console.log('tabs', tabs)

    browser.tabs.sendMessage(
      tabs[0].id,
      {
        type: 2,
      }
    ).then(response => {

    }).catch(e => {

      console.log('e2', e)
    })

  }

  render () {

    return (
      <div className="App">
        <h4>湖北文理学院小助手</h4>
        <button
          onClick={() => this.handleButtonClick()}
          style={{
            backgroundColor: 'red'
          }}
        >打开当前页第一个未读视屏
        </button>

        {/*<button*/}
        {/*onClick={() => this.handleShow()}*/}
        {/*style={{*/}
        {/*backgroundColor: 'green'*/}
        {/*}}*/}
        {/*>播放所有视屏*/}
        {/*</button>*/}
      </div>
    )
  }
}
