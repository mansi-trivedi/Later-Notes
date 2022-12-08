/**
 * @license Copyright (c) 2014-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor.js';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat.js';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote.js';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices.js';
import Comments from '@ckeditor/ckeditor5-comments/src/comments.js';
import DocumentList from '@ckeditor/ckeditor5-list/src/documentlist.js';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import ExportPdf from '@ckeditor/ckeditor5-export-pdf/src/exportpdf.js';
import ExportWord from '@ckeditor/ckeditor5-export-word/src/exportword.js';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor.js';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor.js';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily.js';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize.js';
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';
import ImportWord from '@ckeditor/ckeditor5-import-word/src/importword.js';
import Indent from '@ckeditor/ckeditor5-indent/src/indent.js';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js';
import Link from '@ckeditor/ckeditor5-link/src/link.js';
import PageBreak from '@ckeditor/ckeditor5-page-break/src/pagebreak.js';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice.js';
import TrackChanges from '@ckeditor/ckeditor5-track-changes/src/trackchanges.js';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline.js';

class Editor extends ClassicEditor {}

// Plugins to include in the build.
Editor.builtinPlugins = [
	Alignment,
	Autoformat,
	BlockQuote,
	Bold,
	CloudServices,
	Comments,
	DocumentList,
	Essentials,
	ExportPdf,
	ExportWord,
	FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
	Heading,
	ImportWord,
	Indent,
	Italic,
	Link,
	PageBreak,
	Paragraph,
	PasteFromOffice,
	TrackChanges,
	Underline,
];

// Editor configuration.
Editor.defaultConfig = {
	toolbar: {
		items: [
			'heading',
			'bold',
			'italic',
			'underline',
			'link',
			'fontBackgroundColor',
			'fontColor',
			'fontSize',
			'fontFamily',
			'blockQuote',
			'|',
			'bulletedList',
			'numberedList',
			'outdent',
			'indent',
			'alignment',
			'|',
			'pageBreak',
			'comment',
			'trackChanges',
			'exportWord',
			'exportPdf',
			'importWord',
			'undo',
			'redo'
		]
	},
	language: 'en',
	comments: {
		editorConfig: {
			extraPlugins: [
				Bold,
				Italic,
				Autoformat
			]
		}
	}
};

export default Editor;
