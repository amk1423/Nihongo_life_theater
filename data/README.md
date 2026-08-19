# 本地词库

`jmdict-common.json` 由 JMdict 的 common-only 英文版本生成，包含日语词形、假名、词性和英文基础释义。构建来源与授权遵循 [JMdict](https://www.jmdict.org/) 及 [jmdict-simplified](https://github.com/scriptin/jmdict-simplified) 的要求。

中文释义由应用内常用学习词条和联网中文词典补充；英文释义不会被直接冒充为中文。

`japanese-chinese-final.json` 是 [Japanese-Chinese-thesaurus](https://github.com/lxl66566/Japanese-Chinese-thesaurus) 的 `final.json`，包含约 12,716 条日中释义，用于中文反向搜索。该仓库声明使用 Unlicense；本项目保留来源链接。

`jc-special.json` 是公开 StarDict 日中简明专业词典 `jc-special` 的转换版，约 277,766 条日中释义，用于扩大中文反向搜索。原词典页面标注 GPL，来源下载地址为 [胡正 StarDict 词典列表](http://download.huzheng.org/zh_CN/stardict-jc-special-2.4.2.tar.bz2)。

`jmdict-extended.json` 是完整 JMdict 英文数据的精简版，约 274,166 个日语词形；`jmdict-readings.json` 是同一数据的词形—假名索引。它们只在常用词库未命中时按需加载，分别用于扩大日语、假名、罗马音和扩展日中词条的读音覆盖。来源与授权遵循 [JMdict](https://www.jmdict.org/) 及 [jmdict-simplified](https://github.com/scriptin/jmdict-simplified) 的要求。
