/**
 * Run tests based on the solved examples, check at least that for the solved examples everything runs smoothly.
 */

const ProblemsManager = require('../problems-manager');
const assert = require('assert');


const to_test = {
    'printable': false, //Also updates the metadata for all.
    'category': false,
    'exact-category': false, // Tests that the number of categories available are exact, which means, that no porblem should have a tag from another category.
    'basic': false,
    'runnable': false,
    'cloze': true, // Test that cloze cards are populable. Also that the solution exists.
}

describe('Problem integrity', function () {

    it("Test that cloze cards are populable", async function () {
        if (!to_test.cloze) return this.skip();
        
        const cloze_problem_list = require('../cloze/cloze_problem_list.json');
        // console.log("cloze_problem_list", cloze_problem_list);
        
        const problemManager = new ProblemsManager();
        await problemManager.autoPopulateUsingTestDictionary();

        for(const cloze_card of cloze_problem_list){
            const problem = problemManager.getProblem(cloze_card.problem_slug);
            if(problem == null || problem == undefined){
                console.log("_____________ Problem found at _____________")
                console.log("cloze_card.problem_slug", cloze_card.problem_slug);
                console.log("cloze_card.file_path", cloze_card.file_path);
                console.log("problem", problem);
            }
            assert(problem != null || problem != undefined);
        }
    });

    it("Test that all problems have printable prompts", async function () {
        if (!to_test.printable) return this.skip();
        const problemManager = new ProblemsManager();
        await problemManager.autoPopulateUsingTestDictionary();

        const { getPromptDict } = require('../prompt');
        const { renderPromptDescription } = require('../functions');

        const allProblemsMetadata = problemManager.problems;
        for (let problemMetadata of Object.values(allProblemsMetadata)) {

            const promblem_prompt = await getPromptDict(problemMetadata.slug);
            const problem_details = problemManager.getProblem(problemMetadata.slug);
            console.log("testing:", problemMetadata.slug);
            assert(promblem_prompt != null || promblem_prompt != undefined);
            console.log("passed:", problemMetadata.slug);

            // It might be too hard to find out where the error is whithout commenting the following lines.
            const success_at_print = renderPromptDescription(promblem_prompt, problem_details);
            assert(success_at_print);
        }

    });

    it("Test that all problems have basic prompts", async function () {
        if (!to_test.basic) return this.skip();
        const problemManager = new ProblemsManager();
        await problemManager.autoPopulateUsingTestDictionary();
        // if this test fails, make sure you can run func_create_empty_base_codes to populate with a basic template of them all.
        // Or just run it here just in case everytime this test is run:
        const { createEmptyBaseCodes } = require('./func_create_empty_base_codes');
        await createEmptyBaseCodes();

        const allProblemsMetadata = problemManager.problems;
        for (let problemMetadata of Object.values(allProblemsMetadata)) {
            // console.log(problemMetadata);
            assert(problemManager.copyFileToTemp(problemMetadata.file_path) == true)
        }
    });




    // Run and test test available
    it('Should run and test the problem', async function () {
        if (!to_test.runnable) return this.skip();
        const problemManager = new ProblemsManager();
        await problemManager.autoPopulateUsingTestDictionary();

        const allProblemsMetadata = problemManager.problems;
        for (let problemMetadata of Object.values(allProblemsMetadata)) {
            // Grab the solved solution by joining paths?
            const solvedProblemPath = problemMetadata.absolute_solution_path;
            const { Problem } = require(solvedProblemPath);
            console.log("ProblemSolutionObject", Problem);
            const ProblemTestObject = problemManager.selectTest(problemMetadata);
            // console.log("solvedProblemPath", solvedProblemPath);
            const problemTests = new ProblemTestObject(Problem);
            const didPassAllTests = problemTests.runTests();
            if (!didPassAllTests) {
                console.log("Problem failed: ", problemMetadata);
            }
            assert(didPassAllTests);
        }

    });

    it("Categories matches ", async function () {
        if (!to_test.category) return this.skip();

        const problemManager = new ProblemsManager();


        // Populates the metdatas
        await problemManager.autoPopulateUsingTestDictionary();
        const allProblemsMetadata = problemManager.problems;

        // Fetch the expected count using the tests index count of problems.
        const { PROBLEM_COUNT_PER_CATEGORY_TEST_NAME } = require('../tests')

        const problems_per_category_slug = {};

        for (let problemMetadata of Object.values(allProblemsMetadata)) {

            // Increase based on the tests for each category slug.
            for (const category_tag of problemMetadata.tags) {
                problems_per_category_slug[category_tag] = (problems_per_category_slug[category_tag] || 0) + 1;
            }

        }

        // console.log("problems_per_category_slug", problems_per_category_slug);
        /**
         * problems_per_category_slug {
            neetcode: 109,
            sample: 4,
            math: 9,
            array: 4,
            ...
         */

        // Loop over the categories from constatns
        const Constants = require('../constants');

        for (const category of Object.values(Constants.PROBLEM_CATEGORIES)) {
            if (category.order == null || category.order == undefined) continue; // Skip the ones that are not ordered, or don't even have an order.
            if (category?.order <= 0) continue; // Skip the ones that are not ordered, or don't even have an order.


            const category_test_slug = category.test_problem_slug; // The slug in the tests (expected)
            const category_slug_in_md = category.slug; // The slug in the metadata (markdown)

            console.log("_______________________________________________________");
            console.log("category_test_slug", category_test_slug, PROBLEM_COUNT_PER_CATEGORY_TEST_NAME[category_test_slug])
            console.log("category_slug_in_md", category_slug_in_md, problems_per_category_slug[category_slug_in_md])
            assert(PROBLEM_COUNT_PER_CATEGORY_TEST_NAME[category_test_slug] <= problems_per_category_slug[category_slug_in_md]);
        }

    });


    it("Categories matches Exactly ", async function () {
        if (!to_test.category) return this.skip();

        const problemManager = new ProblemsManager();


        // Populates the metdatas
        await problemManager.autoPopulateUsingTestDictionary();
        const allProblemsMetadata = problemManager.problems;

        // Fetch the expected count using the tests index count of problems.
        const { PROBLEM_COUNT_PER_CATEGORY_TEST_NAME } = require('../tests')

        const problems_per_category_slug = {};

        for (let problemMetadata of Object.values(allProblemsMetadata)) {

            // Increase based on the tests for each category slug.
            for (const category_tag of problemMetadata.tags) {
                problems_per_category_slug[category_tag] = (problems_per_category_slug[category_tag] || 0) + 1;
            }

        }

        // console.log("problems_per_category_slug", problems_per_category_slug);
        /**
         * problems_per_category_slug {
            neetcode: 109,
            sample: 4,
            math: 9,
            array: 4,
            ...
         */

        // Loop over the categories from constatns
        const Constants = require('../constants');

        for (const category of Object.values(Constants.PROBLEM_CATEGORIES)) {
            if (category.order == null || category.order == undefined) continue; // Skip the ones that are not ordered, or don't even have an order.
            if (category?.order <= 0) continue; // Skip the ones that are not ordered, or don't even have an order.


            const category_test_slug = category.test_problem_slug; // The slug in the tests (expected)
            const category_slug_in_md = category.slug; // The slug in the metadata (markdown)

            assert.equal(PROBLEM_COUNT_PER_CATEGORY_TEST_NAME[category_test_slug], problems_per_category_slug[category_slug_in_md]);


        }


    })


    


});


