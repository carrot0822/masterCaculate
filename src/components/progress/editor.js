let size = [ // 字体大小
  "normal",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "28px",
  "32px",
  "36px"
];

let fonts = [ // 字体
  "SimSun",
  "SimHei",
  "Microsoft-YaHei",
  "KaiTi",
  "FangSong",
  "Arial",
  "Times-New-Roman",
  "sans-serif"
];
// 配置项
var toolbarOptions = [
    
    
  
    
    [{ list: "ordered" }, { list: "bullet" }], //列表
    
    [{ indent: "-1" }, { indent: "+1" }], // 缩进
    [{ direction: "rtl" }], // 文本方向
  
    //[{ size: size }], // 字体大小 注册流程和配置流程是否有冲突
   // [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
  
    
    
  
    [{ align: [] }], //对齐方式
  
    
    
  ];

export const editorData = {
    fonts,
    size,
    toolbarOptions
}
