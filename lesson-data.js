(function(root){
const words=[
{id:'shan',char:'閃',py:'shǎn',num:'shan3',final:'an',context:'閃亮',options:['shang3','shan3','shuang3'],clue:'閃 shǎn：舌尖收尾，an；想起「閃亮」。'},
{id:'reng',char:'仍',py:'réng',num:'reng2',final:'eng',context:'仍然',options:['ren2','reng2','reng4'],clue:'仍 réng：eng 是後鼻音，第二聲。'},
{id:'lin',char:'林',py:'lín',num:'lin2',final:'in',context:'森林',options:['ling2','lin2','lin4'],clue:'粵語 lam4 以 -m 收尾；普通話 lín 以 -n 收尾，不能直接照搬。'},
{id:'feng',char:'豐',py:'fēng',num:'feng1',final:'eng',context:'豐富',options:['fen1','feng1','feng4'],clue:'豐 fēng：eng 是後鼻音，第一聲。'},
{id:'jian',char:'劍',py:'jiàn',num:'jian4',final:'ian',context:'寶劍',options:['jiang4','jian4','jian3'],clue:'劍 jiàn：ian 以 -n 收尾，第四聲。'},
{id:'tang',char:'躺',py:'tǎng',num:'tang3',final:'ang',context:'躺下',options:['tan3','tang3','tang2'],clue:'躺 tǎng：ang 以 -ng 收尾，第三聲。'},
{id:'qing',char:'輕',py:'qīng',num:'qing1',final:'ing',context:'輕輕',options:['qin1','qing1','qing3'],clue:'粵語 hing1 與普通話 qīng 都是 -ng 韻尾；仍需核對普通話聲母。'},
{id:'ceng',char:'層',py:'céng',num:'ceng2',final:'eng',context:'樓層',options:['cen2','ceng2','ceng4'],clue:'層 céng：eng 是後鼻音，第二聲。'},
{id:'xing',char:'興',py:'xīng',num:'xing1',final:'ing',context:'興奮',options:['xin1','xing1','xing4'],clue:'本題是「興奮」的興，讀 xīng；「高興」才讀 xìng。'},
{id:'men',char:'門',py:'mén',num:'men2',final:'en',context:'開門',options:['meng2','men2','men4'],clue:'粵語 mun4 和普通話 mén 都以 -n 收尾，但韻腹不同。'}];
const opening={text:'各位乘客請注意，前往新城站的列車即將進站。',pinyin:'ge4 wei4 cheng2 ke4 qing3 zhu4 yi4 , qian2 wang3 xin1 cheng2 zhan4 de5 lie4 che1 ji2 jiang1 jin4 zhan4 .',wrong:[2,4,8,9,10,11,12,17,18,19]};
const finals=[
{text:'請推開門，奔向森林。',pinyin:'qing3 tui1 kai1 men2 , ben1 xiang4 sen1 lin2 .',wrong:[3,8]},
{text:'我輕輕躺在草地上，望着閃閃的星星，心情興奮不已。',pinyin:'wo3 qing1 qing1 tang3 zai4 cao3 di4 shang4 , wang4 zhe5 shan3 shan3 de5 xing1 xing1 , xin1 qing2 xing1 fen4 bu4 yi3 .',wrong:[1,3,11,15,19,20]}];
function tokens(s){return Array.from(s.text).map((c,i)=>({char:c,py:s.pinyin.split(' ')[i],nasal:/n(?:g)?[1-5]$/.test(s.pinyin.split(' ')[i]),wrong:s.wrong.includes(i),punct:/[，。]/.test(c)}));}
const readingBroadcast="歡迎來到 GAPSK星球！雲層之上，這座植被豐茂的新小鎮正閃耀着光芒。陽光如劍穿過樹林，奔騰溪水輕拂石橋。小車站靜躺鐵軌旁，仍在等待你推開家門。別再緊綳神經，快先一步懷着興奮心情，來這裏與美好相遇吧！祝你玩得開心！";
const practiceUrl="https://sayo.ai/zh-HK/hub/cmwimll0q002g08jvs9lzvk4z";
const readingTargets="層豐新閃劍林奔輕躺仍門綳先興相";
const data={words,opening,finals,tokens,readingBroadcast,readingTargets,practiceUrl};if(typeof module!=='undefined')module.exports=data;else root.LessonData=data;
})(typeof window==='undefined'?globalThis:window);
