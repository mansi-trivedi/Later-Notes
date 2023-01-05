/**
 * @license Copyright (c) 2014-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor.js';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote.js';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices.js';
import DocumentList from '@ckeditor/ckeditor5-list/src/documentlist.js';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import ExportPdf from '@ckeditor/ckeditor5-export-pdf/src/exportpdf.js';
import ExportWord from '@ckeditor/ckeditor5-export-word/src/exportword.js';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor.js';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor.js';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily.js';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize.js';
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight.js';
import ImportWord from '@ckeditor/ckeditor5-import-word/src/importword.js';
import Indent from '@ckeditor/ckeditor5-indent/src/indent.js';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock.js';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js';
import PageBreak from '@ckeditor/ckeditor5-page-break/src/pagebreak.js';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';
import RealTimeCollaborativeComments from '@ckeditor/ckeditor5-real-time-collaboration/src/realtimecollaborativecomments.js';
import RealTimeCollaborativeEditing from '@ckeditor/ckeditor5-real-time-collaboration/src/realtimecollaborativeediting.js';
import RealTimeCollaborativeTrackChanges from '@ckeditor/ckeditor5-real-time-collaboration/src/realtimecollaborativetrackchanges.js';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough.js';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline.js';
import Comments from '@ckeditor/ckeditor5-comments/src/comments.js';
import TrackChanges from '@ckeditor/ckeditor5-track-changes/src/trackchanges.js';

class Editor extends ClassicEditor {}

// Plugins to include in the build.
Editor.builtinPlugins = [
	Alignment,
	BlockQuote,
	Bold,
	CloudServices,
	DocumentList,
	Essentials,
	ExportPdf,
	ExportWord,
	FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
	Heading,
	Highlight,
	ImportWord,
	Indent,
	IndentBlock,
	Italic,
	PageBreak,
	Paragraph,
	RealTimeCollaborativeComments,
	RealTimeCollaborativeEditing,
	RealTimeCollaborativeTrackChanges,
	Strikethrough,
	Underline,
	Comments,
	TrackChanges
];

// Editor configuration.
Editor.defaultConfig = {
	toolbar: {
		items: [
			'heading',
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'|',
			'blockQuote',
			'fontBackgroundColor',
			'fontColor',
			'fontFamily',
			'fontSize',
			'highlight',
			'bulletedList',
			'numberedList',
			'outdent',
			'indent',
			'|',
			'exportPdf',
			'exportWord',
			'importWord',
			'comment',
			'trackChanges',
			'|',
			'pageBreak',
			'redo',
			'undo'
		]
	},
	language: 'en',
	comments: {
		editorConfig: {
			extraPlugins: [
				Bold,
				Italic
			]
		}
	}
};

export default Editor;
