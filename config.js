/*
  你通常只需要修改这个文件，以及替换 assets/ 中的图片和视频。
  所有链接都建议使用 https:// 开头的完整地址。
*/

window.SITE_CONFIG = {
  pageTitle: "PPGCNet Project Page",


  title: "Perception Prior-Guided Spatial-Frequency Collaborative Network",
  subtitle: "for Infrared and Low-Light Visible Video Fusion",

  authors: [
    { name: "Dingli Hua", affiliations: [1] },
    { name: "Taojun Yang", affiliations: [1] },
    { name: "Yifan Zuo", affiliations: [1] },
    { name: "Hanyu Xuan", affiliations: [2] },
    { name: "Zhiliang Wu", affiliations: [3] },
    { name: "Cheng Zhao", affiliations: [4] },
{ name: "Yuming Fang", affiliations: [1] },
  ],

  affiliations: [
    { id: 1, name: "Jiangxi University of Finance and Economics" },
    { id: 2, name: "Anhui University" },
    { id: 3, name: "Nanyang Technological University" },
    { id: 4, name: "Shenzhen University" },
  ],

  links: [
    { label: "Paper (Coming Soon)", url: "#", enabled: false },
    { label: "GitHub Repo", url: "https://github.com/y-rzjc/PPGCNet", enabled: true },
    { label: "BibTeX", url: "#citationSection", enabled: true }
  ],

  abstract: [
    "Infrared and low-light visible video fusion aims to integrate the stable thermal target responses from the infrared modality with the rich texture details from the visible modality. However, existing methods lack effective modality-specific perception prior modeling. As a result, they struggle to capture reliable structural information under low-light conditions and fail to fully exploit the correlation between infrared thermal responses and target structures. To address these limitations, we propose a perception prior-guided spatial–frequency collaborative network for infrared and low-light visible video fusion, termed PPGCNet. The PPGCNet consists of three key modules: a perception prior-guided feature extraction (PPFE) module, a spatial–frequency collaborative fusion (SFCF) module, and a temporal consistency modeling (TCM) module. First, the PPFE module constructs modality-specific low-light and thermal perception priors and introduces a prior-guided Transformer to dynamically enhance modality-specific feature representations. Second, the modalityspecific enhanced features are fed into the SFCF module, which further incorporates frequency-guided spatial modulation with a mixture-of-experts (MoE) strategy to achieve adaptive multimodal feature fusion. Finally, the fused features are further processed by the TCM module, which models temporal dependencies between video frames through temporal correlation learning to reduce temporal flickering in the fused results. Extensive experiments on multiple datasets demonstrate that the proposed method outperforms existing approaches in fusion quality and downstream task performance. Code will be released at https://github.com/y-rzjc/PPGCNet.",
  ],


  comparison: {
    heading: "Visual Comparisons",
    hint: "💡 Play, pause, or scrub through any video, and the other videos in the same row will synchronize.",
    labels: ["Infrared", "Visible", "Fused"],
    folders: [
      "assets/videos/Infrared/",
      "assets/videos/Visible/",
      "assets/videos/Fused/"
    ],
    samples: [
      {
        title: "Scene 01",
        files: ["k_ir.mp4", "k_vi.mp4", "k_fused.mp4"]
      }
      // 继续添加：
      ,{
         title: "Scene 02",
         files: ["wurenji_0304_01_ir.mp4", "wurenji_0304_01_vi.mp4", "wurenji_0304_01_fused.mp4"]
       },
	{
        title: "Scene 03",
        files: ["0111_1716_or_ir.mp4", "0111_1716_or_vi.mp4", "0111_1716_fused.mp4"]
      }


    ]
  },

  bibtex: `@article{PPGCNet2026,
  title   = {Perception Prior-Guided Spatial-Frequency Collaborative Network for Infrared and Low-Light Visible Video Fusion},
  author  = {Dingli Hua, Taojun Yang, Yifan Zuo, Hanyu Xuan, Zhiliang Wu, Cheng Zhao, Yuming Fang},
  journal = {Under Review},
  year    = {2026}
}`
};
