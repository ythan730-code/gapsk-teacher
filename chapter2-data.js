(function(root){
const groups=[{id:'in-en',label:'in / en',hint:'兩者都以 n 收尾；先聽清前面的 i 或 e，不要只記住 n。',pair:['賓','奔'],py:['bīn','bēn']},{id:'an-en',label:'an / en',hint:'比較「盤 pán」和「盆 pén」：留意 a 與 e 的不同，跟老師各讀一次。',pair:['盤','盆'],py:['pán','pén']},{id:'ei-i',label:'ei / i',hint:'ei 是複韻母，發音有滑動；i 是單韻母。比較「備 bèi」與「避 bì」。',pair:['備','避'],py:['bèi','bì']}];
// word, complete pinyin, highlighted character index, numeric target, final, distractor
const rows=[
['貴賓','guì bīn',1,'bin1','in','ben1'],['勤奮','qín fèn',0,'qin2','in','chen2'],['身體','shēn tǐ',0,'shen1','en','xin1'],['毛巾','máo jīn',1,'jin1','in','zhen1'],['珍珠','zhēn zhū',0,'zhen1','en','jin1'],['米粉','mǐ fěn',1,'fen3','en','pin3'],
['盤子','pán zi',0,'pan2','an','pen2'],['盆子','pén zi',0,'pen2','en','pan2'],['一般','yī bān',1,'ban1','an','ben1'],['充滿','chōng mǎn',1,'man3','an','men3'],['根本','gēn běn',1,'ben3','en','ban3'],['判斷','pàn duàn',0,'pan4','an','pen4'],
['設備','shè bèi',1,'bei4','ei','bi4'],['避免','bì miǎn',0,'bi4','i','bei4'],['勞累','láo lèi',1,'lei4','ei','li4'],['微風','wēi fēng',0,'wei1','ei','yi1'],['杯子','bēi zi',0,'bei1','ei','bi1'],['鼻孔','bí kǒng',0,'bi2','i','bei2'],
['聰敏','cōng mǐn',1,'min3','in','men3'],['品格','pǐn gé',0,'pin3','in','pen3'],['頻率','pín lǜ',0,'pin2','in','pen2'],['奮鬥','fèn dòu',0,'fen4','en','pin4'],['伸展','shēn zhǎn',0,'shen1','en','xin1'],['分裂','fēn liè',0,'fen1','en','pin1'],['傷痕','shāng hén',1,'hen2','en','yin2'],['憤怒','fèn nù',0,'fen4','en','pin4'],['誠懇','chéng kěn',1,'ken3','en','kan3'],['沉悶','chén mèn',1,'men4','en','man4'],['恩情','ēn qíng',0,'en1','en','an1'],['揹包','bēi bāo',0,'bei1','ei','bi1']];
const words=rows.map((r,i)=>({id:'c2-'+(i+1),text:r[0],pinyin:r[1],target:r[2],num:r[3],final:r[4],other:r[5],group:i<6||i>=18&&i<27?'in-en':i<12||i>=27&&i<29?'an-en':'ei-i',core:i<18,page:i<6||i>=18&&i<27?43:44}));
const finalIds=[0,5,6,7,12,13].map(i=>words[i].id);
const api={groups,words,finalIds};if(typeof module!=='undefined')module.exports=api;else root.Chapter2Data=api;
})(typeof window==='undefined'?globalThis:window);
