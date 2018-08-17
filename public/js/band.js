// 작성자 : 전형준
// 각 Band 객체들을 정의한 File.
// 모든 Band들은 'Band' 객체를 상속하여 생성된다



/********** 기본 밴드 객체 - 모든 밴드는 이 객체를 상속해서 사용(공통분모) ************
 * 작성자 : 전형준
**************************************************************************************/
function Band(data){
    // this.parentId = data.ParentID;
    // Bands에서 0번째 Band의 ParentID가 없음..

    this.attributes = data._attributes; // 속성(밴드 타입)
    this.id = data.Id._text; // ID
    this.name = data.Name._text; // 이름
    this.rectangle = { // 레이아웃(위치 + 크기)
        x : (data.Rectangle.X === undefined ? "0" : data.Rectangle.X._text),
        y : (data.Rectangle.Y === undefined ? "0" : data.Rectangle.Y._text),
        width : data.Rectangle.Width._text,
        height : (data.Rectangle.Height === undefined ? "0" : data.Rectangle.Height._text)
    };

    this.bandYOrder = data.BandYOrder._text;
    // 아마 밴드 위치 설정하기 위한 옵션인 듯
    // 디자이너에서만 사용되고 뷰어에는 불필요한 옵션인 듯

    // this.childBands = data.ChildBands.anyType;
    // this.childHeaderBands = data.ChildHeaderBands.anyType;
    // this.childFooterBands = data.ChildFooterBands.anyType;

    this.childBands // 자식 밴드들
        = (typeof data.ChildBands.anyType === "undefined" ?
        null : CreateBandArray(data.ChildBands));
    this.childHeaderBands // 헤더의 자식 밴드들
        = (typeof data.ChildHeaderBands.anyType === "undefined" ?
        null : CreateBandArray(data.ChildHeaderBands));
    this.childFooterBands // 풋터의 자식 밴드들
        = (typeof data.ChildFooterBands.anyType === "undefined" ?
        null : CreateBandArray(data.ChildFooterBands));
    this.controlList // 임시로 해둔것 - 안예솔 팀원에게 물어보고 인자를 넘겨줄 것
        = (typeof data.ControlList === undefined ? null : data.ControlList);
}
/*************************************************************************************
 *************************************************************************************/



/******************** Band 객체를 상속하여 만드는 각각의 Band 객체 *******************
 * 작성자 : 전형준
**************************************************************************************/

// 백그라운드밴드
function BandBackGround(band){
    Band.apply(this, arguments);
}

// 포그라운드밴드
function BandForeGround(band){
    Band.apply(this, arguments);
}

// 페이지 헤더 밴드
function BandPageHeader(band){
    Band.apply(this, arguments);
    this.pageOutputSkip = band.PageOutputSkip._text; // 첫 페이지 출력 생략
    this.isApprovalBase = band.IsApprovalBase._text; // 결재란 기준 밴드
    // 인쇄 미리보기 화면에서,
    // 인쇄 고급 설정을 통하여 결재란을 그릴때 기준이 된 밴드에 결재란을 그린다
}

// 페이지 풋터 밴드
function BandPageFooter(band){
    Band.apply(this, arguments);
    this.pageOutputSkip = band.PageOutputSkip._text; // 먹통 - 끝페이지 출력 생략
}

// 써머리 밴드
function BandSummary(band){
    Band.apply(this, arguments);
    this.ignoreNewPage = band.IgnoreNewpage._text; // 먹통 - 새 페이지 무시
    this.topToDownAlign = band.TopToDownAlign._text; // 먹통 - 위에서 아래로 정렬
    this.isBottom = band.IsBottom._text; // 페이지 하단에 출력
}

// 데이터 헤더 밴드
function BandDataHeader(band){
    Band.apply(this, arguments);
    this.showGroupLink = band.ShowGroupLink._text; // 그룹 연결 보기
    this.forceNewPage = band.ForceNewPage._text; // 페이지 넘기기
    this.autoSize = band.AutoSize._text; // 자동 높이 조정
    this.isApprovalBase = band.IsApprovalBase._text; // 결재란 기준 밴드
    // 인쇄 미리보기 화면에서,
    // 인쇄 고급 설정을 통하여 결재란을 그릴때 기준이 된 밴드에 결재란을 그린다
}

// 데이터 풋터 밴드
function BandDataFooter(band){
    Band.apply(this, arguments);
    this.showGroupLink = band.ShowGroupLink._text; // 그룹 연결 보기
    this.forceNewPage = band.ForceNewPage._text; // 페이지 넘기기
    this.autoSize = band.AutoSize._text; // 자동 높이 조정
}

// 데이터 밴드
function BandData(band){
    Band.apply(this, arguments);
    this.hasHeader = band.HasHeader._text; // 헤더밴드 소유
    this.hasFooter = band.HasFooter._text; // 풋터밴드 소유
    this.showGroupLink = band.ShowGroupLink._text; // 그룹 연결 보기
    this.dummyHeaderCount = band.DummyHeaderCount._text; // 더미(헤더)
    this.dummyFooterCount = band.DummyFooterCount._text; // 더미(풋터)
    this.subBandCount = band.SubBandCount._text; // 서브 밴드
    this.fixMaster = band.FixMaster._text; // 마스터 고정
    this.fixTitle = band.FixTitle._text; // 데이터 헤더 밴드 고정
    this.forceNewPage = band.ForceNewPage._text; // 페이지 넘기기
    this.invisible = band.Invisible._text; // 감추기
    this.fixPriorGroupHeader = band.FixPriorGroupHeader._text; // 상위 그룹 헤더 고정
    this.fixPriorGroupFooter = band.FixPriorGroupFooter._text; // 상위 그룹 풋터 고정
    this.autoSize = band.AutoSize._text; // 자동 높이 조정
    this.repeatNumber = band.RepeatNumber._text; // 반복 횟수
    this.dziName = band.DziName._text; // 데이터 셋 이름
    this.dataTableName = band.DataTableName._text; // 테이블 이름
    this.isContainTypeDynamicTable = band.IsContainTypeDynamicTable._text; // 동적테이블 보유 여부
    this.isContainTypeChart = band.IsContainTypeChart._text; // 차트 보유 여부
    this.isContainTypeCrossTable = band.IsContainTypeCrossTable._text; // 크로스탭 테이블 보유 여부
    this.isContainTypeRegion = band.IsContainTypeRegion._text; // 리전 보유 여부
}

// 그룹 헤더 밴드
function BandGroupHeader(band){
    Band.apply(this, arguments);
    this.showGroupLink = band.ShowGroupLink._text; // 그룹 연결 보기
    this.subBand = band.SubBand._text; //
    this.forceNewPage = band.ForceNewPage._text; // 페이지 넘기기
    this.fixPriorGroupHeader = band.FixPriorGroupHeader._text; // 상위 그룹 헤더 고정
    this.invisible = band.Invisible._text; // 감추기
    this.groupingFieldSortOption = band.GroupingFieldSortOption._text;
    this.groupingFieldSort = band.GroupingFieldSort._text;
    this.autoSize = band.AutoSize._text; // 자동 높이 조정
    this.dziName = band.DziName._text; // 데이터 셋 이름
    this.dataTableName = band.DataTableName._text; // 데이터 테이블 이름
    this.groupFiledName = band.GroupFiledName._text; // 그룹 기준 필드
    this.isApprovalBase = band.IsApprovalBase._text; // 결재란 기준 밴드
}

// 그룹 풋터 밴드
function BandGroupFooter(band){
    Band.apply(this, arguments);
    this.subBand = band.SubBand._text; // 서브 밴드
    this.forceNextReport = band.ForceNextReport._text; // 리포트 넘기기
    this.forceNewPage = band.ForceNewPage._text; // 페이지 넘기기
    this.repeatNumber = band.RepeatNumber._text; // 반복 횟수
    this.invisible = band.Invisible._text; // 감추기
    this.autoSize = band.AutoSize._text; // 자동 높이 조정
    this.dziName = band.DziName._text; // 데이터 셋 이름
    this.dataTableName = band.DataTableName._text; // 데이터 테이블 이름
    this.groupFiledName = band.GroupFiledName._text; // 그룹 기준 필드
}

// 타이틀 밴드
function BandTitle(band){
    Band.apply(this, arguments);
    this.dummyHeaderCount = band.DummyHeaderCount._text; // 더미(헤더)
    this.dummyFooterCount = band.DummyFooterCount._text; // 더미(풋터)
    this.forceNewPage = band.ForceNewPage._text; // 먹통?? - 페이지 넘기기
    this.autoSize = band.AutoSize._text; // DRD에서 수정 불가 속성 - 먹통?
    this.isApprovalBase = band.IsApprovalBase._text; // 결재란 기준 밴드
    // 인쇄 미리보기 화면에서,
    // 인쇄 고급 설정을 통하여 결재란을 그릴때 기준이 된 밴드에 결재란을 그린다
}

// 테일 밴드
function BandTail(band){
    Band.apply(this, arguments);
    this.invisible = band.Invisible._text; // 감추기
}

// 더미 밴드
function BandDummy(band){
    Band.apply(this, arguments);
    this.forceNewPage = band.ForceNewPage._text; // 먹통?? - 페이지 넘기기
    this.stopAtPageEnd = band.StopAtPageEnd._text; // 값의 의미가 없는 속성?
    this.repeatNubmer = band.RepeatNubmer._text; // DRD에서 수정 불가 속성 - 먹통?
    this.autoSize = band.AutoSize._text; // DRD에서 수정 불가 속성 - 먹통?
}

// 서브 리포트 밴드
function BandSubReport(band){
    Band.apply(this, arguments);
    this.showGroupLink = band.ShowGroupLink._text; // 먹통?? - 그룹 연결 보기
}

// 더미 헤더 밴드
function BandDummyHeader(band){
    Band.apply(this, arguments);
    this.forceNewPage = band.ForceNewPage._text; // 페이지 넘기기
}

// 더미 풋터 밴드
function BandDummyFooter(band){
    Band.apply(this, arguments);
    this.forceNewPage = band.ForceNewPage._text; // 페이지 넘기기
    this.useSpaceEffect = band.UseSpaceEffect._text; // 여백 효과 사용
}
/********************************************************************
 ********************************************************************/