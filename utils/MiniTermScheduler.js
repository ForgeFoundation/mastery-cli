const { StorableQueue } = require("./StorableQueue.js");

class MiniTermScheduler {
    constructor(cards, { working_set_length = 3, rules = { increase_when_incorrect: true } } = {}) {
        this.working_set_length = working_set_length;
        const naming_post = "mini_term_scheduler";
        this.working_set = new StorableQueue({ name: "working_set" + naming_post });
        this.working_set.enqueueMultiple(cards); // This is the only place where cards are added to the working set
    }

    getCard() {
        if (this.working_set.isEmpty) {
            return false;
        }
        return this.working_set.peek();
    }

    get cardsCount() {
        return this.working_set.length;
    }

    getCardsToLearn() {
        return this.working_set.elements;
    }

    solveCard(wasCorrect) {
        const card = this.working_set.dequeue();

        if (!wasCorrect) {
            // If the card was incorrect, then we add it to the end of the queue to be learnt later
            this.working_set.enqueue(card);
        }
        return this.cardsCount;
    }

    cleanCards() {
        this.working_set.clearQueue();
    }

    saveCards() {
        this.working_set.save();
    }

}


module.exports = { MiniTermScheduler };




