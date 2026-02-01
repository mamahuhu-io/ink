use std::collections::HashMap;
use std::sync::RwLock;

/// Supported languages
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Language {
    English,
    ChineseSimplified,
    Japanese,
    Korean,
    Spanish,
    PortugueseBrazil,
    ChineseTraditional,
}

impl Language {
    pub fn from_code(code: &str) -> Self {
        match code {
            "zh-CN" | "zh" => Language::ChineseSimplified,
            "ja" | "ja-JP" => Language::Japanese,
            "ko" | "ko-KR" => Language::Korean,
            "es" | "es-ES" => Language::Spanish,
            "pt-BR" | "pt" => Language::PortugueseBrazil,
            "zh-TW" | "zh-HK" => Language::ChineseTraditional,
            _ => Language::English,
        }
    }

    pub fn code(&self) -> &'static str {
        match self {
            Language::English => "en",
            Language::ChineseSimplified => "zh-CN",
            Language::Japanese => "ja",
            Language::Korean => "ko",
            Language::Spanish => "es",
            Language::PortugueseBrazil => "pt-BR",
            Language::ChineseTraditional => "zh-TW",
        }
    }
}

/// I18n manager for menu translations
pub struct I18nManager {
    current_language: RwLock<Language>,
    translations: HashMap<Language, HashMap<&'static str, &'static str>>,
}

impl I18nManager {
    pub fn new() -> Self {
        let mut translations = HashMap::new();

        // --- English ---
        let mut en = HashMap::new();
        en.insert("app.about", "About Ink");
        en.insert("app.preferences", "Preferences...");
        en.insert("app.services", "Services");
        en.insert("app.hide", "Hide Ink");
        en.insert("app.hide_others", "Hide Others");
        en.insert("app.show_all", "Show All");
        en.insert("app.quit", "Quit Ink");
        en.insert("menu.file", "File");
        en.insert("menu.file.new_window", "New Window");
        en.insert("menu.file.new_tab", "New Tab");
        en.insert("menu.file.open", "Open...");
        en.insert("menu.file.open_recent", "Open Recent");
        en.insert("menu.file.no_recent", "No Recent Items");
        en.insert("menu.file.clear_recent", "Clear Recent Items");
        en.insert("menu.file.save", "Save");
        en.insert("menu.file.save_as", "Save As...");
        en.insert("menu.file.import", "Import...");
        en.insert("menu.file.export", "Export");
        en.insert("menu.file.export.html", "HTML...");
        en.insert("menu.file.export.pdf", "PDF...");
        en.insert("menu.file.export.docx", "Word (.docx)...");
        en.insert("menu.file.export.image", "Image (.png)...");
        en.insert("menu.file.close_tab", "Close Tab");
        en.insert("menu.file.quit", "Quit");
        en.insert("menu.edit", "Edit");
        en.insert("menu.edit.undo", "Undo");
        en.insert("menu.edit.redo", "Redo");
        en.insert("menu.edit.cut", "Cut");
        en.insert("menu.edit.copy", "Copy");
        en.insert("menu.edit.paste", "Paste");
        en.insert("menu.edit.select_all", "Select All");
        en.insert("menu.edit.find", "Find...");
        en.insert("menu.edit.find_replace", "Find and Replace...");
        en.insert("menu.edit.search_files", "Search in Files...");
        en.insert("menu.edit.preferences", "Preferences...");
        en.insert("menu.view", "View");
        en.insert("menu.view.toggle_sidebar", "Toggle Sidebar");
        en.insert("menu.view.toggle_source", "Toggle Source Mode");
        en.insert("menu.view.zoom_in", "Zoom In");
        en.insert("menu.view.zoom_out", "Zoom Out");
        en.insert("menu.view.actual_size", "Actual Size");
        en.insert("menu.view.fullscreen", "Toggle Fullscreen");
        en.insert("menu.themes", "Themes");
        en.insert("menu.themes.open_folder", "Open Themes Folder...");
        en.insert("menu.themes.refresh", "Refresh Themes");
        en.insert("menu.window", "Window");
        en.insert("menu.window.minimize", "Minimize");
        en.insert("menu.window.zoom", "Zoom");
        en.insert("menu.help", "Help");
        en.insert("menu.help.website", "Website");
        en.insert("menu.help.about", "About Ink");
        translations.insert(Language::English, en);

        // --- Chinese (Simplified) ---
        let mut zh_cn = HashMap::new();
        zh_cn.insert("app.about", "关于 Ink");
        zh_cn.insert("app.preferences", "偏好设置...");
        zh_cn.insert("app.services", "服务");
        zh_cn.insert("app.hide", "隐藏 Ink");
        zh_cn.insert("app.hide_others", "隐藏其他");
        zh_cn.insert("app.show_all", "显示全部");
        zh_cn.insert("app.quit", "退出 Ink");
        zh_cn.insert("menu.file", "文件");
        zh_cn.insert("menu.file.new_window", "新建窗口");
        zh_cn.insert("menu.file.new_tab", "新建标签页");
        zh_cn.insert("menu.file.open", "打开...");
        zh_cn.insert("menu.file.open_recent", "最近打开");
        zh_cn.insert("menu.file.no_recent", "无最近项目");
        zh_cn.insert("menu.file.clear_recent", "清除最近项目");
        zh_cn.insert("menu.file.save", "保存");
        zh_cn.insert("menu.file.save_as", "另存为...");
        zh_cn.insert("menu.file.import", "导入...");
        zh_cn.insert("menu.file.export", "导出");
        zh_cn.insert("menu.file.export.html", "HTML...");
        zh_cn.insert("menu.file.export.pdf", "PDF...");
        zh_cn.insert("menu.file.export.docx", "Word (.docx)...");
        zh_cn.insert("menu.file.export.image", "图片 (.png)...");
        zh_cn.insert("menu.file.close_tab", "关闭标签页");
        zh_cn.insert("menu.file.quit", "退出");
        zh_cn.insert("menu.edit", "编辑");
        zh_cn.insert("menu.edit.undo", "撤销");
        zh_cn.insert("menu.edit.redo", "重做");
        zh_cn.insert("menu.edit.cut", "剪切");
        zh_cn.insert("menu.edit.copy", "复制");
        zh_cn.insert("menu.edit.paste", "粘贴");
        zh_cn.insert("menu.edit.select_all", "全选");
        zh_cn.insert("menu.edit.find", "查找...");
        zh_cn.insert("menu.edit.find_replace", "查找和替换...");
        zh_cn.insert("menu.edit.search_files", "在文件中搜索...");
        zh_cn.insert("menu.edit.preferences", "偏好设置...");
        zh_cn.insert("menu.view", "视图");
        zh_cn.insert("menu.view.toggle_sidebar", "切换侧边栏");
        zh_cn.insert("menu.view.toggle_source", "切换源码模式");
        zh_cn.insert("menu.view.zoom_in", "放大");
        zh_cn.insert("menu.view.zoom_out", "缩小");
        zh_cn.insert("menu.view.actual_size", "实际大小");
        zh_cn.insert("menu.view.fullscreen", "切换全屏");
        zh_cn.insert("menu.themes", "主题");
        zh_cn.insert("menu.themes.open_folder", "打开主题文件夹...");
        zh_cn.insert("menu.themes.refresh", "刷新主题");
        zh_cn.insert("menu.window", "窗口");
        zh_cn.insert("menu.window.minimize", "最小化");
        zh_cn.insert("menu.window.zoom", "缩放");
        zh_cn.insert("menu.help", "帮助");
        zh_cn.insert("menu.help.website", "网站");
        zh_cn.insert("menu.help.about", "关于 Ink");
        translations.insert(Language::ChineseSimplified, zh_cn);

        // --- Japanese ---
        let mut ja = HashMap::new();
        ja.insert("app.about", "Inkについて");
        ja.insert("app.preferences", "設定...");
        ja.insert("app.services", "サービス");
        ja.insert("app.hide", "Inkを隠す");
        ja.insert("app.hide_others", "他を隠す");
        ja.insert("app.show_all", "すべて表示");
        ja.insert("app.quit", "Inkを終了");
        ja.insert("menu.file", "ファイル");
        ja.insert("menu.file.new_window", "新規ウィンドウ");
        ja.insert("menu.file.new_tab", "新規タブ");
        ja.insert("menu.file.open", "開く...");
        ja.insert("menu.file.open_recent", "最近使った項目");
        ja.insert("menu.file.no_recent", "最近使った項目はありません");
        ja.insert("menu.file.clear_recent", "メニューを消去");
        ja.insert("menu.file.save", "保存");
        ja.insert("menu.file.save_as", "名前を付けて保存...");
        ja.insert("menu.file.import", "インポート...");
        ja.insert("menu.file.export", "エクスポート");
        ja.insert("menu.file.export.html", "HTML...");
        ja.insert("menu.file.export.pdf", "PDF...");
        ja.insert("menu.file.export.docx", "Word (.docx)...");
        ja.insert("menu.file.export.image", "画像 (.png)...");
        ja.insert("menu.file.close_tab", "タブを閉じる");
        ja.insert("menu.file.quit", "終了");
        ja.insert("menu.edit", "編集");
        ja.insert("menu.edit.undo", "元に戻す");
        ja.insert("menu.edit.redo", "やり直し");
        ja.insert("menu.edit.cut", "切り取り");
        ja.insert("menu.edit.copy", "コピー");
        ja.insert("menu.edit.paste", "貼り付け");
        ja.insert("menu.edit.select_all", "すべて選択");
        ja.insert("menu.edit.find", "検索...");
        ja.insert("menu.edit.find_replace", "検索と置換...");
        ja.insert("menu.edit.search_files", "ファイルを検索...");
        ja.insert("menu.edit.preferences", "設定...");
        ja.insert("menu.view", "表示");
        ja.insert("menu.view.toggle_sidebar", "サイドバーの切り替え");
        ja.insert("menu.view.toggle_source", "ソースモードの切り替え");
        ja.insert("menu.view.zoom_in", "拡大");
        ja.insert("menu.view.zoom_out", "縮小");
        ja.insert("menu.view.actual_size", "実際のサイズ");
        ja.insert("menu.view.fullscreen", "フルスクリーン");
        ja.insert("menu.themes", "テーマ");
        ja.insert("menu.themes.open_folder", "テーマフォルダを開く...");
        ja.insert("menu.themes.refresh", "テーマを更新");
        ja.insert("menu.window", "ウィンドウ");
        ja.insert("menu.window.minimize", "最小化");
        ja.insert("menu.window.zoom", "ズーム");
        ja.insert("menu.help", "ヘルプ");
        ja.insert("menu.help.website", "ウェブサイト");
        ja.insert("menu.help.about", "Inkについて");
        translations.insert(Language::Japanese, ja);

        // --- Korean ---
        let mut ko = HashMap::new();
        ko.insert("app.about", "Ink 정보");
        ko.insert("app.preferences", "환경설정...");
        ko.insert("app.services", "서비스");
        ko.insert("app.hide", "Ink 숨기기");
        ko.insert("app.hide_others", "기타 숨기기");
        ko.insert("app.show_all", "모두 표시");
        ko.insert("app.quit", "Ink 종료");
        ko.insert("menu.file", "파일");
        ko.insert("menu.file.new_window", "새 창");
        ko.insert("menu.file.new_tab", "새 탭");
        ko.insert("menu.file.open", "열기...");
        ko.insert("menu.file.open_recent", "최근 항목 열기");
        ko.insert("menu.file.no_recent", "최근 항목 없음");
        ko.insert("menu.file.clear_recent", "최근 항목 지우기");
        ko.insert("menu.file.save", "저장");
        ko.insert("menu.file.save_as", "다른 이름으로 저장...");
        ko.insert("menu.file.import", "가져오기...");
        ko.insert("menu.file.export", "내보내기");
        ko.insert("menu.file.export.html", "HTML...");
        ko.insert("menu.file.export.pdf", "PDF...");
        ko.insert("menu.file.export.docx", "Word (.docx)...");
        ko.insert("menu.file.export.image", "이미지 (.png)...");
        ko.insert("menu.file.close_tab", "탭 닫기");
        ko.insert("menu.file.quit", "종료");
        ko.insert("menu.edit", "편집");
        ko.insert("menu.edit.undo", "실행 취소");
        ko.insert("menu.edit.redo", "다시 실행");
        ko.insert("menu.edit.cut", "잘라내기");
        ko.insert("menu.edit.copy", "복사");
        ko.insert("menu.edit.paste", "붙여넣기");
        ko.insert("menu.edit.select_all", "모두 선택");
        ko.insert("menu.edit.find", "찾기...");
        ko.insert("menu.edit.find_replace", "찾기 및 바꾸기...");
        ko.insert("menu.edit.search_files", "파일 검색...");
        ko.insert("menu.edit.preferences", "환경설정...");
        ko.insert("menu.view", "보기");
        ko.insert("menu.view.toggle_sidebar", "사이드바 토글");
        ko.insert("menu.view.toggle_source", "소스 모드 토글");
        ko.insert("menu.view.zoom_in", "확대");
        ko.insert("menu.view.zoom_out", "축소");
        ko.insert("menu.view.actual_size", "실제 크기");
        ko.insert("menu.view.fullscreen", "전체 화면");
        ko.insert("menu.themes", "테마");
        ko.insert("menu.themes.open_folder", "테마 폴더 열기...");
        ko.insert("menu.themes.refresh", "테마 새로 고침");
        ko.insert("menu.window", "창");
        ko.insert("menu.window.minimize", "최소화");
        ko.insert("menu.window.zoom", "확대/축소");
        ko.insert("menu.help", "도움말");
        ko.insert("menu.help.website", "웹사이트");
        ko.insert("menu.help.about", "Ink 정보");
        translations.insert(Language::Korean, ko);

        // --- Spanish ---
        let mut es = HashMap::new();
        es.insert("app.about", "Acerca de Ink");
        es.insert("app.preferences", "Preferencias...");
        es.insert("app.services", "Servicios");
        es.insert("app.hide", "Ocultar Ink");
        es.insert("app.hide_others", "Ocultar otros");
        es.insert("app.show_all", "Mostrar todo");
        es.insert("app.quit", "Salir de Ink");
        es.insert("menu.file", "Archivo");
        es.insert("menu.file.new_window", "Nueva ventana");
        es.insert("menu.file.new_tab", "Nueva pestaña");
        es.insert("menu.file.open", "Abrir...");
        es.insert("menu.file.open_recent", "Abrir recientes");
        es.insert("menu.file.no_recent", "No hay elementos recientes");
        es.insert("menu.file.clear_recent", "Borrar elementos recientes");
        es.insert("menu.file.save", "Guardar");
        es.insert("menu.file.save_as", "Guardar como...");
        es.insert("menu.file.import", "Importar...");
        es.insert("menu.file.export", "Exportar");
        es.insert("menu.file.export.html", "HTML...");
        es.insert("menu.file.export.pdf", "PDF...");
        es.insert("menu.file.export.docx", "Word (.docx)...");
        es.insert("menu.file.export.image", "Imagen (.png)...");
        es.insert("menu.file.close_tab", "Cerrar pestaña");
        es.insert("menu.file.quit", "Salir");
        es.insert("menu.edit", "Editar");
        es.insert("menu.edit.undo", "Deshacer");
        es.insert("menu.edit.redo", "Rehacer");
        es.insert("menu.edit.cut", "Cortar");
        es.insert("menu.edit.copy", "Copiar");
        es.insert("menu.edit.paste", "Pegar");
        es.insert("menu.edit.select_all", "Seleccionar todo");
        es.insert("menu.edit.find", "Buscar...");
        es.insert("menu.edit.find_replace", "Buscar y reemplazar...");
        es.insert("menu.edit.search_files", "Buscar en archivos...");
        es.insert("menu.edit.preferences", "Preferencias...");
        es.insert("menu.view", "Ver");
        es.insert("menu.view.toggle_sidebar", "Alternar barra lateral");
        es.insert("menu.view.toggle_source", "Alternar modo fuente");
        es.insert("menu.view.zoom_in", "Acercar");
        es.insert("menu.view.zoom_out", "Alejar");
        es.insert("menu.view.actual_size", "Tamaño real");
        es.insert("menu.view.fullscreen", "Pantalla completa");
        es.insert("menu.themes", "Temas");
        es.insert("menu.themes.open_folder", "Abrir carpeta de temas...");
        es.insert("menu.themes.refresh", "Actualizar temas");
        es.insert("menu.window", "Ventana");
        es.insert("menu.window.minimize", "Minimizar");
        es.insert("menu.window.zoom", "Zoom");
        es.insert("menu.help", "Ayuda");
        es.insert("menu.help.website", "Sitio web");
        es.insert("menu.help.about", "Acerca de Ink");
        translations.insert(Language::Spanish, es);

        // --- Portuguese (Brazil) ---
        let mut pt_br = HashMap::new();
        pt_br.insert("app.about", "Sobre o Ink");
        pt_br.insert("app.preferences", "Preferências...");
        pt_br.insert("app.services", "Serviços");
        pt_br.insert("app.hide", "Ocultar Ink");
        pt_br.insert("app.hide_others", "Ocultar Outros");
        pt_br.insert("app.show_all", "Mostrar Tudo");
        pt_br.insert("app.quit", "Sair do Ink");
        pt_br.insert("menu.file", "Arquivo");
        pt_br.insert("menu.file.new_window", "Nova Janela");
        pt_br.insert("menu.file.new_tab", "Nova Aba");
        pt_br.insert("menu.file.open", "Abrir...");
        pt_br.insert("menu.file.open_recent", "Abrir Recentes");
        pt_br.insert("menu.file.no_recent", "Nenhum item recente");
        pt_br.insert("menu.file.clear_recent", "Limpar itens recentes");
        pt_br.insert("menu.file.save", "Salvar");
        pt_br.insert("menu.file.save_as", "Salvar Como...");
        pt_br.insert("menu.file.import", "Importar...");
        pt_br.insert("menu.file.export", "Exportar");
        pt_br.insert("menu.file.export.html", "HTML...");
        pt_br.insert("menu.file.export.pdf", "PDF...");
        pt_br.insert("menu.file.export.docx", "Word (.docx)...");
        pt_br.insert("menu.file.export.image", "Imagem (.png)...");
        pt_br.insert("menu.file.close_tab", "Fechar Aba");
        pt_br.insert("menu.file.quit", "Sair");
        pt_br.insert("menu.edit", "Editar");
        pt_br.insert("menu.edit.undo", "Desfazer");
        pt_br.insert("menu.edit.redo", "Refazer");
        pt_br.insert("menu.edit.cut", "Recortar");
        pt_br.insert("menu.edit.copy", "Copiar");
        pt_br.insert("menu.edit.paste", "Colar");
        pt_br.insert("menu.edit.select_all", "Selecionar Tudo");
        pt_br.insert("menu.edit.find", "Localizar...");
        pt_br.insert("menu.edit.find_replace", "Localizar e Substituir...");
        pt_br.insert("menu.edit.search_files", "Pesquisar nos arquivos...");
        pt_br.insert("menu.edit.preferences", "Preferências...");
        pt_br.insert("menu.view", "Exibir");
        pt_br.insert("menu.view.toggle_sidebar", "Alternar Barra Lateral");
        pt_br.insert("menu.view.toggle_source", "Alternar Modo Fonte");
        pt_br.insert("menu.view.zoom_in", "Aumentar Zoom");
        pt_br.insert("menu.view.zoom_out", "Diminuir Zoom");
        pt_br.insert("menu.view.actual_size", "Tamanho Real");
        pt_br.insert("menu.view.fullscreen", "Tela Cheia");
        pt_br.insert("menu.themes", "Temas");
        pt_br.insert("menu.themes.open_folder", "Abrir Pasta de Temas...");
        pt_br.insert("menu.themes.refresh", "Atualizar Temas");
        pt_br.insert("menu.window", "Janela");
        pt_br.insert("menu.window.minimize", "Minimizar");
        pt_br.insert("menu.window.zoom", "Zoom");
        pt_br.insert("menu.help", "Ajuda");
        pt_br.insert("menu.help.website", "Site");
        pt_br.insert("menu.help.about", "Sobre o Ink");
        translations.insert(Language::PortugueseBrazil, pt_br);

        // --- Chinese (Traditional) ---
        let mut zh_tw = HashMap::new();
        zh_tw.insert("app.about", "關於 Ink");
        zh_tw.insert("app.preferences", "偏好設定...");
        zh_tw.insert("app.services", "服務");
        zh_tw.insert("app.hide", "隱藏 Ink");
        zh_tw.insert("app.hide_others", "隱藏其他");
        zh_tw.insert("app.show_all", "顯示全部");
        zh_tw.insert("app.quit", "結束 Ink");
        zh_tw.insert("menu.file", "檔案");
        zh_tw.insert("menu.file.new_window", "新視窗");
        zh_tw.insert("menu.file.new_tab", "新分頁");
        zh_tw.insert("menu.file.open", "開啟...");
        zh_tw.insert("menu.file.open_recent", "最近開啟");
        zh_tw.insert("menu.file.no_recent", "無最近項目");
        zh_tw.insert("menu.file.clear_recent", "清除最近項目");
        zh_tw.insert("menu.file.save", "儲存");
        zh_tw.insert("menu.file.save_as", "另存新檔...");
        zh_tw.insert("menu.file.import", "匯入...");
        zh_tw.insert("menu.file.export", "匯出");
        zh_tw.insert("menu.file.export.html", "HTML...");
        zh_tw.insert("menu.file.export.pdf", "PDF...");
        zh_tw.insert("menu.file.export.docx", "Word (.docx)...");
        zh_tw.insert("menu.file.export.image", "圖片 (.png)...");
        zh_tw.insert("menu.file.close_tab", "關閉分頁");
        zh_tw.insert("menu.file.quit", "結束");
        zh_tw.insert("menu.edit", "編輯");
        zh_tw.insert("menu.edit.undo", "復原");
        zh_tw.insert("menu.edit.redo", "取消復原");
        zh_tw.insert("menu.edit.cut", "剪下");
        zh_tw.insert("menu.edit.copy", "複製");
        zh_tw.insert("menu.edit.paste", "貼上");
        zh_tw.insert("menu.edit.select_all", "全選");
        zh_tw.insert("menu.edit.find", "尋找...");
        zh_tw.insert("menu.edit.find_replace", "尋找與取代...");
        zh_tw.insert("menu.edit.search_files", "在檔案中搜尋...");
        zh_tw.insert("menu.edit.preferences", "偏好設定...");
        zh_tw.insert("menu.view", "檢視");
        zh_tw.insert("menu.view.toggle_sidebar", "切換側邊欄");
        zh_tw.insert("menu.view.toggle_source", "切換原始碼模式");
        zh_tw.insert("menu.view.zoom_in", "放大");
        zh_tw.insert("menu.view.zoom_out", "縮小");
        zh_tw.insert("menu.view.actual_size", "實際大小");
        zh_tw.insert("menu.view.fullscreen", "切換全螢幕");
        zh_tw.insert("menu.themes", "主題");
        zh_tw.insert("menu.themes.open_folder", "開啟主題資料夾...");
        zh_tw.insert("menu.themes.refresh", "重新整理主題");
        zh_tw.insert("menu.window", "視窗");
        zh_tw.insert("menu.window.minimize", "最小化");
        zh_tw.insert("menu.window.zoom", "縮放");
        zh_tw.insert("menu.help", "說明");
        zh_tw.insert("menu.help.website", "網站");
        zh_tw.insert("menu.help.about", "關於 Ink");
        translations.insert(Language::ChineseTraditional, zh_tw);

        Self {
            current_language: RwLock::new(Language::English),
            translations,
        }
    }

    /// Get translation for a key
    pub fn t(&self, key: &str) -> String {
        let lang = *self.current_language.read().unwrap();
        self.translations
            .get(&lang)
            .and_then(|t| t.get(key))
            .map(|s| s.to_string())
            .unwrap_or_else(|| {
                // Fallback to English if key not found in current language
                self.translations
                    .get(&Language::English)
                    .and_then(|t| t.get(key))
                    .map(|s| s.to_string())
                    .unwrap_or_else(|| key.to_string())
            })
    }

    /// Set current language
    pub fn set_language(&self, code: &str) {
        let lang = Language::from_code(code);
        *self.current_language.write().unwrap() = lang;
    }

    /// Get current language code
    pub fn get_language(&self) -> String {
        self.current_language.read().unwrap().code().to_string()
    }
}